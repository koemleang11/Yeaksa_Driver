import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../theme/colors';
import { Box } from 'native-base';
import { screenWidth } from '../../theme/layouts';
import { navigate } from '../../services/navigate/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Routes } from '../../temp/Routes';
import AuthComponent from '../../component/AuthComponent';
import { TextTranslate } from '../../component/custom/Label';
import { size } from '../../theme/fonts';
import TextInputWithLabel from '../../component/input/TextInputWithLabel';
import TextInputPassword from '../../component/input/TextInputPassword';
import SubmitButton from '../../component/custom/SubmitButton';
import Octicons from 'react-native-vector-icons/Octicons';

const SignUpScreen = () => {
  const [agree, setAgree] = useState(false);
  const initailValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    shopName: '',
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phoneNumber: Yup.string()
      .min(10, 'Inccorect Phone Number')
      .required('Phone Number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .label('confirm password')
      .required()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });
  const handleSubmit = (type: any) => {

  };
  return (
    <AuthComponent>
      <Box style={styles.whiteBox}>
        <TextTranslate style={styles.title}>signup_capital</TextTranslate>
        <Formik
          initialValues={initailValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
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
              <View style={{ width: '100%' }}>
                <TextInputWithLabel
                  label='first_name'
                  placeholder={'Reaksmey'}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                />
                <TextInputWithLabel
                  label='last_name'
                  placeholder={'Sunchhay'}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                />
                <TextInputWithLabel
                  label='email_address'
                  placeholder={'Phnom Penh'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                <TextInputWithLabel
                  label='phone_number'
                  placeholder={'012 234 345'}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                />
                <TextInputPassword
                  label='password'
                  placeholder={'********'}
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                <TextInputPassword
                  label='confirm_password'
                  placeholder={'********'}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                />
                <TextInputWithLabel
                  label='shop_name'
                  placeholder={'Phsar Tech'}
                  value={values.shopName}
                  onChangeText={handleChange('shopName')}
                />
                <TouchableOpacity onPress={() => setAgree(!agree)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: screenWidth(15) }}>
                  <Octicons name={agree ? 'check-circle-fill' : 'circle'} color={colors.mainColor} size={screenWidth(24)} />
                  <TextTranslate style={styles.grayText}>i_accept_term_of_use_privacy_policy</TextTranslate>
                </TouchableOpacity>
                <SubmitButton
                  onPress={() => navigate(Routes.MainTab)}
                  // onPress={handleSubmit}
                  title='signup'
                  width={'100%'}
                  marginTop={screenWidth(15)}
                />
              </View>
            );
          }}
        </Formik>
      </Box>
    </AuthComponent>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  whiteBox: {
    width: screenWidth(440),
    borderRadius: screenWidth(25),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    paddingTop: screenWidth(30),
    paddingBottom: screenWidth(40),
    paddingHorizontal: screenWidth(30),
    overflow: 'hidden',
    marginBottom: screenWidth(59),
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  title: {
    fontSize: size.font28,
    color: colors.black,
  },
  subtitle: {
    fontSize: size.font18,
    color: colors.black,
    textAlign: 'center',
    lineHeight: screenWidth(26)
  },
  grayText: {
    fontSize: size.font16,
    color: colors.grayColor,
    marginLeft: screenWidth(10)
  }
});
