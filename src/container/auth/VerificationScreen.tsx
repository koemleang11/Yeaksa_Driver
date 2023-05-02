import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { HStack, useToast } from 'native-base'
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch'
import { size } from '../../theme/fonts'
import colors from '../../theme/colors'
import { screenWidth } from '../../theme/layouts'
import { navigate, reset } from '../../services/navigate/navigation'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { MessageType, showToast } from '../../component/custom/Toast'
import BaseComponent from '../../component/BaseComponent'
import { TextTranslate, TextTranslateBold } from '../../component/custom/Label'
import DigitCodeInput from '../../component/input/DigitCodeInput'
import SubmitButton from '../../component/custom/SubmitButton'
import SpinnerLoading from '../../component/loading/SpinnerLoading'
import { Battambang } from '../../services/config/fonts'
import { loadLoading } from '../../redux/actions'
import { Routes } from '../../temp/Routes'

let interval: any;

const VerificationScreen = (props: any) => {

    const { phoneNumber, screen, name, image, address } = props.route.params

    const dispatch = useAppDispatch();
    const toast = useToast();
    const loading = useAppSelector(state => state.loading);
    const lang: any = useAppSelector(state => state.lang);

    const [timer, setTimer] = useState(60);
    const [code, setCode] = React.useState('');
    const [mistakeCount, setMistakeCount] = React.useState(3);
    const [verifiedID, setVerifiedID] = React.useState('');

    useEffect(() => {
        if (mistakeCount == 0) {
            reset('Login')
            setMistakeCount(3)
        }
    }, [mistakeCount])

    useEffect(() => {
        if (timer === 60) signInWithPhoneNumber(`+855${phoneNumber}`);
        return () => {
            clearInterval(interval);
            setTimer(60);
        };
    }, [phoneNumber]);

    // async function PostUpdate(end_point: any, form_data: any) {
    //     let token = await AsyncStorage.getItem('@token');
    //     var myHeader = new Headers();
    //     myHeader.append('Cache-Control', 'no-cache');
    //     myHeader.append('Accept', 'application/json');
    //     myHeader.append('Content-Type', 'multipart/form-data');
    //     myHeader.append('Authorization', `Bearer ${token}`);
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await fetch(`${baseUrl}${end_point}`, {
    //                 method: 'POST',
    //                 headers: myHeader,
    //                 body: form_data,
    //             })
    //                 .then(res => res.json())
    //                 .then(result => {
    //                     resolve(result)
    //                     showToast(toast, 'successfully', MessageType.success)
    //                     dispatch(loadUser.request())
    //                     navigate('MyProfile')
    //                 });
    //         } catch (error) {
    //             console.log(`Request URL : ${baseUrl}${end_point}`);
    //             console.log('error===', error);
    //             reject(error);
    //             showToast(toast, 'please_try_again', MessageType.error)
    //         }
    //     });
    // }

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
                        console.log('phoneAuthSnapshot', phoneAuthSnapshot);
                        dispatch(loadLoading(false))
                        showToast(toast, 'code_sent', MessageType.success);
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
                dispatch(loadLoading(false))
                if (error.code === 'auth/too-many-requests') {
                    reset('Authentication')
                    showToast(toast, 'process_has_been_suspended', MessageType.error);
                } else if (error.code === 'auth/invalid-phone-number') {
                    showToast(toast, 'invalid_phone_number', MessageType.error);
                } else if (error.code === 'auth/missing-phone-number') {
                    showToast(toast, 'phone_can_not_send', MessageType.error);
                } else if (error.code === 'auth/quota-exceeded') {
                    showToast(toast, 'process_closed', MessageType.error);
                } else if (error.code === 'auth/operation-not-allowed') {
                    showToast(toast, 'operation_not_allowed', MessageType.error);
                } else if (error.code === 'auth/user-disabled') {
                    showToast(toast, 'user_disabled', MessageType.error);
                } else if (error.code === 'auth/retry-phone-auth') {
                    showToast(toast, 'retry', MessageType.error);
                } else {
                    reset('Authentication')
                    showToast(toast, 'system_problem_try_again_later', MessageType.error);
                }
                console.log(error);
                clearInterval(interval);
            });
    }
    async function _confirmCode(verificationId: any, code: any) {
        dispatch(loadLoading(true));
        const provider = await auth.PhoneAuthProvider;
        const authCredential = await provider.credential(verificationId, code);
        signInWithPhoneAuthCredential(authCredential);
    }

    async function signInWithPhoneAuthCredential(
        credential: FirebaseAuthTypes.AuthCredential,
    ) {
        await auth()
            .signInWithCredential(credential)
            .then(async () => {
                if (screen === 'forgot_password') {
                    reset(Routes.NewPassword, { phone: phoneNumber })
                    dispatch(loadLoading(false))
                } else if ('edit_profile') {
                    onCheckUser()
                } else {

                }
            })
            .catch(async error => {
                console.log(error);
                dispatch(loadLoading(false))
                if (error.code === 'auth/invalid-verification-code') {
                    setCode('')
                    setMistakeCount(mistakeCount - 1)
                    showToast(toast, 'code_is_invalid', MessageType.error);
                    return;
                } else if (error.code === 'auth/user-disabled') {
                    setCode('')
                    setMistakeCount(mistakeCount - 1)
                    showToast(toast, 'process_has_been_suspended', MessageType.error);
                } else if (error.code === 'auth/invalid-verification-id') {
                    setCode('')
                    setMistakeCount(mistakeCount - 1)
                    showToast(toast, 'request_not_work', MessageType.error);
                } else {
                    setCode('')
                    setMistakeCount(mistakeCount - 1)
                    showToast(toast, 'try_again', MessageType.error);
                }
                clearInterval(interval);
            });
    }
    function verifyCode() {
        if (code.length !== 6) {
            showToast(toast, 'please_enter_a_6_digit_code', MessageType.warning);
            return;
        } else {
            _confirmCode(verifiedID, code);
        }
    }
    const onCheckUser = async () => {
        if (screen === Routes.ForgetPassword) {
            dispatch(loadLoading(false))
            navigate('SetNewPassword', { phoneNumber: phoneNumber })
        } else if (screen === 'edit_profile') {
            dispatch(loadLoading(true))
            const formdata = new FormData()
            formdata.append('name', name)
            formdata.append('phone', phoneNumber)
            formdata.append('address', address)
            image.type && formdata.append('image', {
                uri: image?.uri,
                type: image?.type,
                name: image?.name
            });
            // PostUpdate('update-profile', formdata)
        }
        setCode('');
    };

    return (
        <>
            <BaseComponent title='verification' style={{ flex: 1, backgroundColor: colors.white, paddingHorizontal: screenWidth(40) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        {/* <Image style={styles.authImage} source={AppImages.OTPImage} /> */}
                        <TextTranslateBold style={styles.title}>{'an_OTP_has_been_sent_to_your_phone_number'}</TextTranslateBold>
                        <TextTranslate style={styles.subtitle}>{'enter_your_6_digit_security_code'}</TextTranslate>
                        <DigitCodeInput
                            value={code}
                            onChangeText={(value: any) => setCode(value)}
                        />
                        {timer > 0 ?
                            <Text style={styles.timer}>{timer + 's'}</Text> :
                            <HStack alignItems='center' justifyContent={'center'} style={{ marginBottom: screenWidth(10) }}>
                                <TextTranslate style={styles.subtitle}>{'not_receive'}</TextTranslate>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (timer <= 0) {
                                            dispatch(loadLoading(true))
                                            setTimer(60);
                                            signInWithPhoneNumber(`+855${phoneNumber}`, true);
                                        }
                                    }}
                                >
                                    <TextTranslateBold style={[styles.subtitle]}>{'resend'}</TextTranslateBold>
                                </TouchableOpacity>
                            </HStack>
                        }
                        <SubmitButton
                            title='verify'
                            width='100%'
                            onPress={() => {
                                if (timer > 0) {
                                    if (code.trim().length == 6) {
                                        Keyboard.dismiss();
                                    }
                                    verifyCode()
                                } else {
                                    showToast(toast, 'code_expire', MessageType.error)
                                }
                            }}
                        />
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
                    </View>
                </ScrollView>
            </BaseComponent>
            {
                loading && <SpinnerLoading />
            }
        </>
    )
}

export default VerificationScreen

const styles = StyleSheet.create({
    authImage: {
        width: screenWidth(180),
        height: screenWidth(180),
        alignSelf: 'center',
        marginVertical: 10
    },
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: size.font24,
        color: colors.mainColor,
        marginTop: screenWidth(5),
        marginHorizontal: screenWidth(22),
        textAlign: 'center'
    },
    subtitle: {
        fontSize: size.font16,
        color: colors.black,
        textAlign: 'center',
        marginTop: screenWidth(5),
        marginBottom: screenWidth(10)
    },
    timer: {
        fontSize: size.font18,
        color: colors.black,
        textAlign: 'center',
        marginBottom: screenWidth(30)
    },
    text: {
        ...Battambang,
        fontSize: size.font16,
        color: colors.black,
        marginTop: screenWidth(15)
    }
})