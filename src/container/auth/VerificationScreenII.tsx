import { StyleSheet, Text, FlatList, View, Alert, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../theme/colors';
import { HStack, useToast, VStack } from 'native-base';
import { screenWidth } from '../../theme/layouts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate, reset } from '../../services/navigate/navigation';
import { Routes } from '../../temp/Routes';
import ParentComponent from '../../component/ParentComponent';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import DigitCodeInput from '../../component/input/DigitCodeInput';
import SubmitButton from '../../component/custom/SubmitButton';
import { TextTranslate } from '../../component/custom/Label';
import { size } from '../../theme/fonts';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';
import { loadLoading } from '../../redux/actions';
import { showToast } from '../../component/custom/Toast';

let interval: any;

const VerificationScreen = (props: any) => {
  const { type, phone } = props.route.params;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.loading);
  const lang: any = useAppSelector(state => state.lang);

  const [timer, setTimer] = useState(60);
  const [code, setCode] = React.useState('');
  const [mistakeCount, setMistakeCount] = React.useState(3);
  const [verifiedID, setVerifiedID] = React.useState('');

  useEffect(() => {
    if (mistakeCount == 0) {
      reset(Routes.Login);
      setMistakeCount(3);
    }
  }, [mistakeCount]);

  async function _confirmCode(verificationId: any, code: any) {
    dispatch(loadLoading(true));
    const provider = await auth.PhoneAuthProvider;
    const authCredential = await provider.credential(verificationId, code);
    signInWithPhoneAuthCredential(authCredential);
  }

  useEffect(() => {
    if (timer === 60) signInWithPhoneNumber(`+855${phone}`);
    return () => {
      clearInterval(interval);
      setTimer(60);
    };
  }, [phone]);

  async function signInWithPhoneNumber(phoneNumber: any, isResend = false) {
    await auth()
      .verifyPhoneNumber(phoneNumber, isResend)
      .on('state_changed', async phoneAuthSnapshot => {
        switch (phoneAuthSnapshot.state) {
          case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
            const { verificationId, code } = phoneAuthSnapshot;
            if (
              verificationId !== '' ||
              verificationId !== null ||
              verificationId !== undefined
            ) {
              if (code !== null) {
                console.log('code', code);
                setCode(code);
                await _confirmCode(verificationId, code);
              }
            }
            break;

          case auth.PhoneAuthState.CODE_SENT: // or 'sent'
            setVerifiedID(phoneAuthSnapshot.verificationId);
            dispatch(loadLoading(false));
            showToast(toast, 'code_sent');
            let count = 0;
            interval = setInterval(() => {
              if (count === 60) {
                clearInterval(interval);
              }
              setTimer((counter: number) => counter - 1);
              count = count + 1;
            }, 1000);
            break;
          case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
            break;
          case auth.PhoneAuthState.ERROR: // or 'error'
            break;
        }
      })
      .catch(async error => {
        dispatch(loadLoading(false));
        if (error.code === 'auth/too-many-requests') {
          reset('Authentication')
          Alert.alert('Request Failed', lang['process_has_been_suspended'], [{ text: 'OK' }]);
        } else if (error.code === 'auth/invalid-phone-number') {
          Alert.alert('Request Failed', lang['invalid_phone_number'], [{ text: 'OK' }]);
        } else if (error.code === 'auth/missing-phone-number') {
          Alert.alert('Request Failed', lang['phone_can_not_send'], [{ text: 'OK' }]);
        } else if (error.code === 'auth/quota-exceeded') {
          Alert.alert('Request Failed', lang['process_closed'], [{ text: 'OK' }]);
        } else if (error.code === 'auth/operation-not-allowed') {
          Alert.alert('Request Failed', lang['operation_not_allowed'], [{ text: 'OK' }]);
        } else if (error.code === 'auth/user-disabled') {
          Alert.alert('Request Failed', lang['user_disabled'], [{ text: 'OK' }]);
        } else if (error.code === 'auth/retry-phone-auth') {
          Alert.alert('Request Failed', lang['retry'], [{ text: 'OK' }]);
        } else {
          reset(Routes.Login);
          Alert.alert('Request Failed', lang['system_problem_try_again_later'], [{ text: 'OK', onPress: () => { } }]);
        }
        console.log(error);
        clearInterval(interval);
      });
  }
  async function signInWithPhoneAuthCredential(
    credential: FirebaseAuthTypes.AuthCredential,
  ) {
    await auth()
      .signInWithCredential(credential)
      .then(async () => {
        if (type === Routes.ForgetPassword) {
          reset(Routes.NewPassword, { phone: phone })
          dispatch(loadLoading(false));
        } else if ('edit_profile') {
          // onCheckUser()
        } else {

        }
      })
      .catch(async error => {
        console.log(error);
        dispatch(loadLoading(false));
        if (error.code === 'auth/invalid-verification-code') {
          setCode('');
          setMistakeCount(mistakeCount - 1);
          Alert.alert('Request Failed', lang['code_is_invalid'], [{ text: 'OK' }]);
          return;
        } else if (error.code === 'auth/user-disabled') {
          setCode('')
          setMistakeCount(mistakeCount - 1)
          Alert.alert('Request Failed', lang['process_has_been_suspended'], [{ text: 'OK' }]);

        } else if (error.code === 'auth/invalid-verification-id') {
          setCode('')
          setMistakeCount(mistakeCount - 1)
          Alert.alert('Request Failed', lang['request_not_work'], [{ text: 'OK' }]);
        } else {
          setCode('')
          setMistakeCount(mistakeCount - 1)
          Alert.alert('Request Failed', lang['try_again'], [{ text: 'OK' }]);
        }
        clearInterval(interval);
      });
  }

  const handleSubmit = () => {
    if (timer > 0) {
      if (code.trim().length == 6) {
        Keyboard.dismiss();
        _confirmCode(verifiedID, code);
      } else {
        Alert.alert('Verified Failed', lang['please_enter_a_6_digit_code'], [{ text: 'OK' }]);
      }
    } else {
      Alert.alert('Invalid Code', lang['code_expire'], [{ text: 'OK' }]);
    }
  }

  return (
    <ParentComponent title='verification' style={{
      paddingHorizontal: screenWidth(25)
    }}>
      <FlatList
        data={null}
        renderItem={() => <></>}
        ListHeaderComponent={
          <>
            <VStack>
              <TextTranslate style={styles.text}>please_enter_otp_code_sent_to</TextTranslate>
              <Text style={{ ...styles.text, marginTop: 0, marginBottom: screenWidth(40) }}>087286868</Text>
            </VStack>
            <View style={{ width: '85%', alignSelf: 'center' }}>
              <DigitCodeInput
                value={code}
                onChangeText={setCode}
              />
            </View>
            {
              lang['lang'] == 'kh' ? <HStack alignItems='center'>
                <TextTranslate style={styles.text}>attemps_remain</TextTranslate>
                <Text style={[styles.text, { lineHeight: screenWidth(21) }]}>{mistakeCount}</Text>
                <TextTranslate style={styles.text}>more</TextTranslate>
              </HStack> : <Text style={styles.text}>
                {
                  mistakeCount == 1 ? mistakeCount + ' Attempt remaining' : mistakeCount + ' Attempts remaining'
                }
              </Text>
            }
            {/* <TouchableOpacity onPress={() => { }}>
              <TextTranslate style={styles.buttonText}>resend</TextTranslate>
            </TouchableOpacity> */}
            <SubmitButton
              onPress={handleSubmit}
              title='verify'
              marginTop={screenWidth(40)}
            />
          </>
        }
      />
    </ParentComponent>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: size.font20,
    width: screenWidth(310),
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: screenWidth(40),
  },
  buttonText: {
    fontSize: size.font18,
    color: colors.mainColor,
    alignSelf: 'center',
    paddingTop: screenWidth(10),
    marginTop: screenWidth(10)
  }
});
