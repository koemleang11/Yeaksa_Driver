import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../theme/colors';
import {Box, useToast} from 'native-base';
import {screenWidth} from '../../theme/layouts';
import {navigate, reset} from '../../services/navigate/navigation';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Routes} from '../../temp/Routes';
import AuthComponent from '../../component/AuthComponent';
import {TextTranslate} from '../../component/custom/Label';
import {size} from '../../theme/fonts';
import TextInputWithLabel from '../../component/input/TextInputWithLabel';
import TextInputPassword from '../../component/input/TextInputPassword';
import SubmitButton from '../../component/custom/SubmitButton';
import {useAppDispatch, useAppSelector} from '../../hooks/dispatch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'apisauce';
import {baseUrl} from '../../services/api/index.service';
import {loadLoading} from '../../redux/actions';
import messaging from '@react-native-firebase/messaging';
import {MessageType, showToast} from '../../component/custom/Toast';
import {TextInput} from 'react-native';
import {Platform} from 'react-native';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const lang: any = useAppSelector(state => state.lang);
  const toast = useToast();
  const [state, setState] = useState({phone: '', password: ''});
  const [errors, setError] = useState<any>({});

  const validation = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!state.phone) {
      handleError('phone_number_is_required', 'phone');
      isValid = false;
    } else if (
      state.phone.trim().length < 9 ||
      state.phone.trim().length > 10
    ) {
      handleError('enter_a_valid_phone_number', 'phone');
      isValid = false;
    }
    if (!state.password) {
      handleError('password_is_required', 'password');
      isValid = false;
    } else if (state.password.trim().length < 6) {
      handleError('password_must_be_at_least_6_characters', 'password');
      isValid = false;
    }
    if (isValid) {
      // handleLogin();
      navigate(Routes.MainTab);
    }
  };

  const handleLogin = async () => {
    dispatch(loadLoading(true));
    let fcm_token = await messaging().getToken();
    const apiSauce = create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
      },
    });
    await apiSauce
      .post('login', {...state, fcm_token})
      .then(async (response: any) => {
        try {
          if (response.data.message === true) {
            await AsyncStorage.setItem('@token', response?.data?.data?.token);
            reset(Routes.MainTab);
            dispatch(loadLoading(false));
            showToast(toast, 'successfully', MessageType.success);
          } else {
            Alert.alert(
              'Login Failed',
              'Your phone or password is incorrect.\nPlease try again.',
              [{text: 'OK', onPress: () => {}}],
            );
            dispatch(loadLoading(false));
          }
        } catch (error) {
          console.log(error);
        }
      });
  };

  const handleStatechange = (value: any, stateName: any) => {
    setState(prevState => ({...prevState, [stateName]: value}));
  };

  const handleError = (error: any, stateName: any) => {
    setError((prevState: any) => ({...prevState, [stateName]: error}));
  };

  return (
    <AuthComponent onBackPress={() => navigate(Routes.Language)}>
      <Box style={styles.whiteBox}>
        <TextTranslate style={styles.title}>login_capital</TextTranslate>
        <TextTranslate
          style={{
            ...styles.subtitle,
            marginTop: screenWidth(10),
            marginBottom: screenWidth(5),
            alignSelf: 'center',
          }}>
          login_with_your_phone_number_and_password_to_continue
        </TextTranslate>
        <TextInputWithLabel
          label="phone_number"
          placeholder={lang['your_phone_number']}
          value={state.phone}
          onChangeText={(value: any) => {
            if (!isNaN(value) && !value.includes('.')) {
              handleStatechange(value, 'phone');
            }
          }}
          onFocus={() => handleError(null, 'phone')}
          keyboardType={'numeric'}
          errors={errors.phone}
        />
        <TextInputPassword
          label="password"
          placeholder={lang['your_password']}
          value={state.password}
          onChangeText={(value: any) => handleStatechange(value, 'password')}
          onFocus={() => handleError(null, 'password')}
          errors={errors.password}
        />
        <TouchableOpacity onPress={() => navigate(Routes.ForgetPassword)}>
          <TextTranslate style={styles.forgetPassword}>
            forgot_password
          </TextTranslate>
        </TouchableOpacity>
        <SubmitButton
          onPress={validation}
          // onPress={() => navigate(Routes.MainTab)}
          title="login"
          width={'100%'}
          marginTop={screenWidth(15)}
        />
        <SubmitButton
          onPress={() => navigate(Routes.SignUp)}
          title="signup"
          width={'100%'}
          backgroundColor={'transparent'}
          borderColor={colors.mainColor}
          borderWidth={screenWidth(2)}
          color={colors.mainColor}
          marginTop={screenWidth(15)}
        />
      </Box>
    </AuthComponent>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  whiteBox: {
    width: screenWidth(440),
    borderRadius: screenWidth(25),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingTop: screenWidth(30),
    paddingBottom: screenWidth(40),
    paddingHorizontal: screenWidth(30),
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    fontSize: size.font28,
    color: colors.black,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: size.font18,
    color: colors.black,
    textAlign: 'center',
  },
  forgetPassword: {
    fontSize: size.font18,
    color: colors.black,
    alignSelf: 'flex-end',
    paddingTop: screenWidth(10),
  },
});
