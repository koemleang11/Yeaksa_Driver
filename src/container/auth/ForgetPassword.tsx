import { Alert, StyleSheet, TextInput } from 'react-native';
import React, { createRef } from 'react';
import * as Yup from 'yup';
import ParentComponent from '../../component/ParentComponent';
import { screenWidth } from '../../theme/layouts';
import colors from '../../theme/colors';
import { TextTranslate } from '../../component/custom/Label';
import { size } from '../../theme/fonts';
import TextInputWithLabel from '../../component/input/TextInputWithLabel';
import { FlatList } from 'react-native';
import { Formik } from 'formik';
import { style } from '../../styles/style';
import { Battambang } from '../../services/config/fonts';
import SubmitButton from '../../component/custom/SubmitButton';
import { useAppDispatch } from '../../hooks/dispatch';
import { loadLoading } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'apisauce';
import { baseUrl } from '../../services/api/index.service';
import { navigate } from '../../services/navigate/navigation';
import { Routes } from '../../temp/Routes';

const ForgetPassword = () => {
  const dispatch = useAppDispatch();
  const phoneRef = createRef<TextInput>();
  const initailValues = {
    phone: '',
  };
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .max(10, 'enter_a_valid_phone_number')
      .required('phone_number_is_required'),
  });
  const handleSend = async (values: any) => {
    dispatch(loadLoading(true));
    let token = await AsyncStorage.getItem('@token');
    const apiSauce = create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    await apiSauce.post('check-phone', values).then(async (response: any) => {
      try {
        if (response.data.message === true) {
          dispatch(loadLoading(false));
          navigate(Routes.Verification, { type: Routes.ForgetPassword, phoneNumber: values?.phone });
        } else {
          Alert.alert('Sending Failed', 'Your phone number isn\'t exists.\nPlease try again.', [{ text: 'OK', onPress: () => { } }])
          dispatch(loadLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <ParentComponent title='forgot_password' style={{
      paddingHorizontal: screenWidth(25),
    }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={() => <></>}
        ListHeaderComponent={
          <Formik
            initialValues={initailValues}
            validationSchema={validationSchema}
            onSubmit={handleSend}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched
            }) => {
              return (
                <>
                  <TextTranslate style={styles.text}>please_enter_your_phone_number_to_reset_your_password</TextTranslate>
                  <TextInputWithLabel
                    ref={phoneRef}
                    placeholder='012 345 678'
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    backgroundColor={colors.textInputColor}
                    keyboardType={'numeric'}
                    errors={errors.phone}
                    touched={touched.phone}
                  />
                  <SubmitButton
                    onPress={handleSubmit}
                    title='continue'
                    marginTop={screenWidth(60)}
                  />
                </>
              );
            }}
          </Formik>
        }
      />
    </ParentComponent>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  text: {
    fontSize: size.font20,
    width: screenWidth(310),
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: screenWidth(40)
  },
  textInput: {
    width: '100%',
    minWidth: screenWidth(120),
    fontSize: size.font18,
    color: colors.black,
    borderWidth: screenWidth(2),
    ...Battambang,
    backgroundColor: colors.white,
    paddingHorizontal: screenWidth(25),
    height: screenWidth(55),
    borderRadius: screenWidth(10),
    marginTop: screenWidth(20),
    ...style.normalShadow
  },
});
