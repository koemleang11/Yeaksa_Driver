import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../container/auth/LoginScreen';
import ForgetPassword from '../container/auth/ForgetPassword';
import VerificationScreen from '../container/auth/VerificationScreen';
import NewPassword from '../container/auth/NewPassword';
import SucessScreen from '../container/auth/SucessScreen';
import SignUpScreen from '../container/auth/SignUpScreen';
import MainTab from './MainTab';
import MyProfileScreen from '../screens/account/MyProfileScreen';
import SearchScreen from '../screens/mainHistory/SearchScreen';
import ChatSupportScreen from '../screens/account/ChatSupportScreen';
import ChangePasswordScreen from '../screens/account/ChangePasswordScreen';
import AboutUsScreen from '../screens/account/AboutUsScreen';
import ContactUsScreen from '../screens/account/ContactUsScreen';
import TermOfUseScreen from '../screens/account/TermOfUseScreen';
import PrivacyPolicyScreen from '../screens/account/PrivacyPolicyScreen';
import SettingScreen from '../screens/account/SettingScreen';
import OrderDetailScreen from '../screens/order/OrderDetailScreen';
import AddVoucherScreen from '../screens/voucher/AddVoucherScreen';
import MainProduct from './MainProduct';
import BannerSettingScreen from '../screens/shopSetting/BannerSettingScreen';
import DeliveryPointScreen from '../screens/shopSetting/DeliveryPointScreen';
import GeneralSettingScreen from '../screens/shopSetting/GeneralSettingScreen';
import DeliveryPointMapScreen from '../screens/shopSetting/DeliveryPointMapScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import {Routes} from '../temp/Routes';
import LanguageScreen from '../container/auth/LanguageScreen';
import {useAuth} from '../hooks/provider';
import Indelivery from '../screens/dashboard/InDeliveryScreen';
import CommissionScreen from '../screens/dashboard/CommissionScreen';
import TotalAssignedScreen from '../screens/account/TotalAssigned/TotalAssignedScreen';
const MainStack = () => {
  const Stack = createNativeStackNavigator();
  const _user = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={Routes.Started}
        component={_user.user === false ? LoginScreen : MainTab}
        options={{animation: 'fade'}}
      />
      <Stack.Screen
        name={Routes.Language}
        component={LanguageScreen}
        options={{animation: 'fade'}}
      />
      <Stack.Screen
        name={Routes.Login}
        component={LoginScreen}
        options={{animation: 'fade'}}
      />
      <Stack.Screen name={Routes.ForgetPassword} component={ForgetPassword} />
      <Stack.Screen name={Routes.Verification} component={VerificationScreen} />
      <Stack.Screen name={Routes.NewPassword} component={NewPassword} />
      <Stack.Screen name={Routes.Success} component={SucessScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen name={Routes.Indelivery} component={Indelivery} />
      <Stack.Screen name={Routes.Commission} component={CommissionScreen} />
      <Stack.Screen name={Routes.Search} component={SearchScreen} />
      <Stack.Screen
        name={Routes.MainTab}
        component={MainTab}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen name={Routes.MyProfile} component={MyProfileScreen} />
      <Stack.Screen name={Routes.EditProfile} component={EditProfileScreen} />
      <Stack.Screen name={Routes.MainProduct} component={MainProduct} />
      {/* <Stack.Screen name={Routes.Vouchers} component={VoucherScreen} /> */}
      <Stack.Screen name={Routes.AddVoucher} component={AddVoucherScreen} />
      <Stack.Screen name={Routes.ChatSupport} component={ChatSupportScreen} />
      <Stack.Screen
        name={Routes.TotalAssigned}
        component={TotalAssignedScreen}
      />
      <Stack.Screen
        name={Routes.ChangePassword}
        component={ChangePasswordScreen}
      />
      <Stack.Screen name={Routes.AboutUs} component={AboutUsScreen} />
      <Stack.Screen name={Routes.ContactUs} component={ContactUsScreen} />
      <Stack.Screen name={Routes.TermOfUse} component={TermOfUseScreen} />
      <Stack.Screen
        name={Routes.PrivacyPolicy}
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen name={Routes.Settings} component={SettingScreen} />
      <Stack.Screen name={Routes.OrderDetail} component={OrderDetailScreen} />
      <Stack.Screen
        name={Routes.GeneralSetting}
        component={GeneralSettingScreen}
      />
      <Stack.Screen
        name={Routes.DeliveryPickupPoint}
        component={DeliveryPointScreen}
      />
      <Stack.Screen
        name={Routes.BannerSetting}
        component={BannerSettingScreen}
      />
      <Stack.Screen
        name={Routes.DeliveryPickupMap}
        component={DeliveryPointMapScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
