import {
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { screenWidth } from '../../theme/layouts';
import { reset } from '../../services/navigate/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Routes } from '../../temp/Routes';
import ParentComponent from '../../component/ParentComponent';
import { TextTranslate } from '../../component/custom/Label';
import SubmitButton from '../../component/custom/SubmitButton';
import { size } from '../../theme/fonts';
import TextInputPassword from '../../component/input/TextInputPassword';
import { loadLoading } from '../../redux/actions';
import { useAppDispatch } from '../../hooks/dispatch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../services/api/index.service';
import { create } from 'apisauce';
import { MessageType, showToast } from '../../component/custom/Toast';
import { useToast } from 'native-base';

const NewPassword = (props: any) => {
  const { phone } = props.route.params;
  const dispatch = useAppDispatch();
  const toast = useToast();
  const initailValues = {
    password: '',
    confirm_password: '',
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'password_must_be_at_least_6_characters')
      .required('password_is_required'),
    confirm_password: Yup.string()
      .required('confirm_password_is_required')
      .oneOf([Yup.ref('password'), ''], 'password_must_match'),
  });
  const onSubmit = async (values: any) => {
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
    await apiSauce.post('forget-password', { phone, ...values }).then(async (response: any) => {
      try {
        if (response.data.message === true) {
          dispatch(loadLoading(false));
          reset(Routes.Login);
          showToast(toast, 'successfully', MessageType.success);
        } else {
          Alert.alert('Request Failed', 'Something went wrong.\nPlease try again.', [{ text: 'OK', onPress: () => { } }])
          dispatch(loadLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <ParentComponent title='create_new_password' style={{
      paddingHorizontal: screenWidth(25)
    }}>
      <FlatList
        data={null}
        renderItem={() => <></>}
        ListHeaderComponent={
          <Formik
            initialValues={initailValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              submitForm,
            }) => {
              return (
                <>
                  <TextTranslate style={styles.text}>the_new_password_must_be_different_from_previous_password</TextTranslate>
                  <TextInputPassword
                    label='new_password'
                    placeholder='*********'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    errors={errors.password}
                    touched={touched.password}
                  />
                  <TextInputPassword
                    label='confirm_password'
                    placeholder='*********'
                    value={values.confirm_password}
                    onChangeText={handleChange('confirm_password')}
                    errors={errors.confirm_password}
                    touched={touched.confirm_password}
                  />
                  <SubmitButton
                    onPress={handleSubmit}
                    title='save'
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

export default NewPassword;

const styles = StyleSheet.create({
  text: {
    fontSize: size.font20,
    width: screenWidth(360),
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: screenWidth(40)
  }
});
