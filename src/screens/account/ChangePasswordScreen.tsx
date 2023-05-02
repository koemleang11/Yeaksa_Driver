import { FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import BaseComponent from '../../component/BaseComponent'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import { style } from '../../styles/style'
import FastImage from 'react-native-fast-image'
import colors from '../../theme/colors'
import { AppImages } from '../../theme/images'
import TextInputPassword from '../../component/input/TextInputPassword'
import SubmitButton from '../../component/custom/SubmitButton'
import { Box, useDisclose, useToast } from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../../component/modal/CustomModal';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadLoading } from '../../redux/actions'
import { create } from 'apisauce'
import { baseUrl } from '../../services/api/index.service'
import { Alert } from 'react-native'
import { useAppDispatch } from '../../hooks/dispatch'
import { goBack } from '../../services/navigate/navigation'
import { MessageType, showToast } from '../../component/custom/Toast'

const ChangePasswordScreen = () => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const insets = useSafeAreaInsets();
    const toast = useToast();
    const [state, setState] = useState({});
    const dispatch = useAppDispatch();
    const initailValues = {
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    };
    const validationSchema = Yup.object().shape({
        current_password: Yup.string()
            .min(6, 'current_password_is_required')
            .required('current_password_is_required'),
        new_password: Yup.string()
            .min(6, 'password_must_be_at_least_6_characters')
            .required('new_password_is_required'),
        confirm_new_password: Yup.string()
            .required('confirm_password_is_required')
            .oneOf([Yup.ref('new_password'), ''], 'password_must_match'),
    });

    const onSubmit = (values: any) => {
        onOpen();
        setState(values);
    };

    const handleSave = async () => {
        onClose();
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
        await apiSauce.post('change-password', state).then(async (response: any) => {
            try {
                if (response.data.message === true) {
                    dispatch(loadLoading(false));
                    goBack();
                    showToast(toast, 'successfully', MessageType.success)
                } else {
                    Alert.alert('Incorrect Password', 'The password you entered is incorrect. Please try again.', [{ text: 'OK', onPress: () => { } }])
                    dispatch(loadLoading(false));
                }
            } catch (error) {
                console.log(error);
            }
        });
    };

    return (
        <BaseComponent title='change_password' style={styles.container}>
            <Formik
                initialValues={initailValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                    return (
                        <>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={null}
                                renderItem={() => <></>}
                                ListHeaderComponent={
                                    <Box>
                                        <FastImage source={AppImages.Sunchhay} style={styles.profile}>
                                            {/* {
                                            !profile?.path && <FontAwesome
                                                name='image'
                                                size={screenWidth(40)}
                                                color={colors.grayColor}
                                            />
                                        } */}
                                        </FastImage>
                                        <TextInputPassword
                                            label='current_password'
                                            placeholder='********'
                                            value={values.current_password}
                                            onChangeText={handleChange('current_password')}
                                            errors={errors.current_password}
                                            touched={touched.current_password}
                                        />
                                        <TextInputPassword
                                            label='new_password'
                                            placeholder='********'
                                            value={values.new_password}
                                            onChangeText={handleChange('new_password')}
                                            errors={errors.new_password}
                                            touched={touched.new_password}
                                        />
                                        <TextInputPassword
                                            label='confirm_password'
                                            placeholder='********'
                                            value={values.confirm_new_password}
                                            onChangeText={handleChange('confirm_new_password')}
                                            errors={errors.confirm_new_password}
                                            touched={touched.confirm_new_password}
                                        />
                                    </Box>
                                }
                            />
                            <SubmitButton
                                onPress={handleSubmit}
                                title='save'
                                borderRadius={screenWidth(50)}
                                width={'100%'}
                                marginTop={screenWidth(70)}
                                marginBottom={screenWidth(25) + insets.bottom}
                            />
                            <CustomModal
                                isOpen={isOpen}
                                onClose={onClose}
                                title='are_you_sure'
                                subTitle='you_want_to_change_your_password'
                                firstButton='no'
                                secondButton='yes'
                                icon={<Entypo name='cycle' color={colors.white} size={screenWidth(40)} />}
                                firstButtonPress={onClose}
                                secondButtonPress={handleSave}
                            />
                        </>
                    );
                }}
            </Formik>
        </BaseComponent>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: padding_horizontal,
        justifyContent: 'space-between'
    },
    profile: {
        width: screenWidth(140),
        height: screenWidth(140),
        borderRadius: screenWidth(140) / 2,
        borderColor: colors.white,
        borderWidth: screenWidth(5),
        backgroundColor: colors.lowOpacityGray,
        marginVertical: screenWidth(30),
        alignSelf: 'center',
        ...style.center,
        ...style.normalShadow
    },
})