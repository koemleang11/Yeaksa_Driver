import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseComponent from '../../component/BaseComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {Box, VStack, View} from 'native-base';
import FastImage from 'react-native-fast-image';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import colors from '../../theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {style} from '../../styles/style';
import TextInputWithLabel from '../../component/input/TextInputWithLabel';
import SubmitButton from '../../component/custom/SubmitButton';
import {useAppDispatch, useAppSelector} from '../../hooks/dispatch';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import AccountHeader from '../../component/account/AccountHeader';
import EditProfileHeader from '../../component/product/EditProfileHeader';

const EditProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const profileState = useAppSelector(state => state.profile.data);
  const [profile, setProfile] = useState<any>();
  const [firstName, setFirstName] = useState<any>();
  const [lastName, setLastName] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [phone, setPhone] = useState<any>(profileState.phone);
  const loading = useAppSelector(state => state.loading);
  const dispatch = useAppDispatch();
  const [books, updateBooks] = React.useState([]);

  const initailValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('Phone Number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  useEffect(() => {
    // setProfile({path: profileState.profile});
    setFirstName(profileState.name);
    setLastName(profileState.name);
    setEmail(profileState.shop_name);
    setPhone(profileState.phone);
  }, [profileState]);
  useEffect(() => {
    // dispatch(loadLoading(true));
    // dispatch(requestprofile());
  }, []);
  const handleSubmit = async () => {
    // const formdata = new FormData();
    // formdata.append('supplier_name', firstName);
    // formdata.append('shop_name', lastName);
    // formdata.append('account_name', email);
    // const apiSauce = create({
    //   baseURL: baseUrl,
    //   headers: {
    //     'Cache-Control': 'no-cache',
    //     Accept: 'application/json',
    //     Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzk2MGYwMjA0N2U3Yzg4NzUzNzRiY2FiNTk0NDhhODhhMzI3MGVmZjM2OGNiOWZlNzZhZTYwMTliNzY1Yzc5MjNmODhjZjJlZGM4MWQ2MjAiLCJpYXQiOjE2ODI0NzYyMjAuNTMyMzk4LCJuYmYiOjE2ODI0NzYyMjAuNTMyMzk4LCJleHAiOjE3MTQwOTg2MjAuNTMwODEzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.4gklhZS6de3ATiV2pxOQBgZW51KlqDlf8iAftYq7znL42dfi8ppNkbkrQ2UJA2QLq6caFORWnQnMVnBDD3DCSWgulhIwnA9Cyl8fHhjK-6myTStQk79hNeZab28TqjxGJ-d5wrCO7bZAk24EYf9HIO59xEeFBRxppCJSjcfxs5yvXu2yEtIhs_zyI5AwVVPhU1iZlDnX9KUdxsYg9FIq9_P8HIMTHhR0QkZm5_DLpFLkFD2L2cEJ1XtbHHOy_RJM4qyOIu7b0P7K_x1113-VcaujdfMHMkKixdYMBAnPHeFn8AOlia7-PGxg3dID5KuZ2e83lSqsvkpbVHDUUrkvK_QIw0UFawATtz5c7xuOqOTnqHBkTP9kme8C-ikaH5jfmPq1GRPTmK97P5-HeIt7hM6GO2_NURG6mWgRPu1iI9XkrE5FkubpSLESbKmXv2XBiMMO1xyydxuwm6AmjW8HWcXFej_RRt5CD5jrBa3-mxsF661zx3Ky6sdKUaxl7qf5Z-CjFtJjo87zcixxtC1yBApHMVpsyeKZa5WuxtiTxgLtHjp7NmqGrYmnb09MWG1sWzzLaN9EHas4Pf_rZM47QBC5ZfqB9ydaIG4pxrpSjP1A7fWladwzyJI3qJjd7uV5tLSU8_VLE_vQiGOm3BiPZ7uCmx7pIWzwb-RGTiQhIjg'}`,
    //   },
    // });
    // await apiSauce
    //   .post('supplier/update-profile', {
    //     supplier_name: firstName,
    //     shop_name: lastName,
    //     account_name: email,
    //     profile: profile,
    //   })
    //   .then(async (response: any) => {
    //     console.log(response);
    //     try {
    //       if (response.data.message) {
    //         // navigate(Routes.Success);
    //       } else {
    //         ErrorMessage;
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     console.log(response);
    //   });
  };

  const onPress = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(async (image: any) => {});
  };

  return (
    <>
      <View style={{flex: 1}}>
        {!loading && (
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
                <ScrollView showsVerticalScrollIndicator={false}>
                  <EditProfileHeader title="edit_profile" />
                  <VStack style={{marginHorizontal: screenWidth(20)}}>
                    <TextInputWithLabel
                      label="first_name"
                      placeholder="Reaksmey"
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                    <TextInputWithLabel
                      label="last_name"
                      placeholder="Sunchhay"
                      value={lastName}
                      onChangeText={setLastName}
                    />
                    <TextInputWithLabel
                      label="Gander"
                      placeholder="Male"
                      value={email}
                      onChangeText={setEmail}
                    />
                    <TextInputWithLabel
                      label="Date_Of_Birth"
                      placeholder="18-September-1998"
                      value={email}
                      onChangeText={setEmail}
                    />
                    <TextInputWithLabel
                      label="email_address"
                      placeholder="sunchhay768@gmail.com"
                      value={email}
                      onChangeText={setEmail}
                    />
                    <TextInputWithLabel
                      label="shop_phone"
                      placeholder="087 286 868"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </VStack>
                  <SubmitButton
                    title="save"
                    borderRadius={screenWidth(50)}
                    width={screenWidth(440)}
                    marginTop={screenWidth(20)}
                    marginBottom={screenWidth(25) + insets.bottom}
                    marginHorizontal={padding_horizontal}
                    onPress={handleSubmit}
                  />
                </ScrollView>
              );
            }}
          </Formik>
        )}
      </View>
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding_horizontal,
    justifyContent: 'space-between',
  },
  profile: {
    width: screenWidth(140),
    height: screenWidth(140),
    borderRadius: screenWidth(140) / 2,
    borderColor: colors.white,
    borderWidth: screenWidth(5),
    backgroundColor: colors.lowOpacityGray,
    ...style.center,
    ...style.normalShadow,
  },
  button: {
    backgroundColor: colors.white,
    width: screenWidth(36),
    height: screenWidth(36),
    borderRadius: screenWidth(40),
    ...style.center,
    position: 'absolute',
    bottom: screenWidth(5),
    right: 0,
  },
});
