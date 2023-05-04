import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Box, HStack, VStack, useDisclose} from 'native-base';
import colors from '../../theme/colors';
import FastImage from 'react-native-fast-image';
import {metrics, padding_horizontal, screenWidth} from '../../theme/layouts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {size} from '../../theme/fonts';
import {Battambang, BattambangBold} from '../../services/config/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {accountList} from '../../temp/Account';
import {TextTranslate} from '../../component/custom/Label';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {goBack, navigate, reset} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';
import CustomModal from '../../component/modal/CustomModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from '../../hooks/dispatch';
import {loadLoading, loadRefreshing} from '../../redux/actions';
import {create} from 'apisauce';
import {baseUrl} from '../../services/api/index.service';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerLoading from '../../component/loading/SpinnerLoading';
import {requestProfile} from '../../redux/actions/profile';
import AccountHeader from '../../component/account/AccountHeader';
import AccountCard from '../../component/account/AccountCard';
import {AppImages} from '../../theme/images';
import SubmitButton from '../../component/custom/SubmitButton';
import AccountCardImage from '../../component/account/AccountCardImage';

const AccountScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.loading);
  const refreshing = useAppSelector(state => state.refreshing);
  const profileState = useAppSelector(state => state.profile.data);
  const {isOpen, onOpen, onClose} = useDisclose();

  useEffect(() => {
    dispatch(loadLoading(true));
    dispatch(requestProfile());
  }, []);

  const onRefresh = () => {
    dispatch(loadRefreshing(true));
    dispatch(requestProfile());
  };

  const handleLogout = async () => {
    onClose();
    dispatch(loadLoading(true));
    let fcm_token = await messaging().getToken();
    let token = await AsyncStorage.getItem('@token');
    const apiSauce = create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await apiSauce.post('logout', {fcm_token}).then(async (response: any) => {
      try {
        if (response.data.message === true) {
          await AsyncStorage.removeItem('@token');
          reset(Routes.Login);
          dispatch(loadLoading(false));
        } else {
          dispatch(loadLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const _renderItem = useCallback(
    ({item}: any) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (item.route) {
              navigate(item.route);
            } else {
              onOpen();
            }
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: metrics.screenWidth,
            paddingHorizontal: screenWidth(20),
            backgroundColor: 'rgba(255,255,255,0.1)',
            paddingVertical: screenWidth(15),
            marginBottom: screenWidth(1),
          }}>
          <HStack alignItems={'center'}>
            <FastImage
              source={item.icon}
              style={{
                width: screenWidth(30),
                height: screenWidth(30),
                marginRight: screenWidth(15),
              }}
            />
            <TextTranslate style={styles.title}>{item.title}</TextTranslate>
          </HStack>
          <Ionicons
            name="chevron-forward"
            size={screenWidth(30)}
            color={colors.white}
          />
        </TouchableOpacity>
      );
    },
    [accountList],
  );

  return (
    <>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={() => <></>}
        ListHeaderComponent={
          <Box style={{marginBottom: screenWidth(130)}}>
            <AccountHeader title="my_account" />
            <HStack
              style={{
                justifyContent: 'space-between',
                marginHorizontal: screenWidth(20),
                marginVertical: screenWidth(20),
              }}>
              <TextTranslate style={styles.title}>my_delivery</TextTranslate>
              <TextTranslate style={styles.seeAll}>see_all</TextTranslate>
            </HStack>
            <HStack
              style={{
                justifyContent: 'space-between',
                marginHorizontal: padding_horizontal,
              }}>
              <AccountCard
                value="25"
                title="total_assigned"
                icon={AppImages.Assigned}
                onPress={() => navigate(Routes.TotalAssigned)}
              />
              <AccountCard
                title="total_accepted"
                value="5"
                icon={AppImages.Rating}
                size={screenWidth(25)}
              />
            </HStack>
            <HStack
              style={{
                justifyContent: 'space-between',
                marginHorizontal: padding_horizontal,
              }}>
              <AccountCard
                title="in_delivery"
                value="20"
                icon={AppImages.Order}
                onPress={() => navigate(Routes.Indelivery)}
              />
              <AccountCard
                title="total_rejected"
                value="12"
                icon={AppImages.TotalSale}
                size={screenWidth(22)}
              />
            </HStack>
            <HStack
              style={{
                justifyContent: 'space-between',
                marginHorizontal: screenWidth(20),
                marginVertical: screenWidth(20),
              }}>
              <TextTranslate style={styles.title}>about_us</TextTranslate>
            </HStack>
            <HStack
              style={{
                justifyContent: 'space-between',
                marginHorizontal: padding_horizontal,
              }}>
              <AccountCardImage
                value="25"
                title="about_us"
                images={AppImages.AboutUs}
                onPress={() => navigate(Routes.AboutUs)}
              />
              <AccountCardImage
                title="privacy_policy"
                value="5"
                images={AppImages.PrivacyPolicy}
                onPress={() => navigate(Routes.PrivacyPolicy)}
              />
            </HStack>
            <HStack
              style={{
                justifyContent: 'space-between',
                marginHorizontal: padding_horizontal,
              }}>
              <AccountCardImage
                title="term_of_use"
                value="20"
                images={AppImages.TermOfUse}
                onPress={() => navigate(Routes.TermOfUse)}
              />
              <AccountCardImage
                title="contact_us"
                value="$35"
                images={AppImages.ContactUs}
                onPress={() => navigate(Routes.ContactUs)}
              />
            </HStack>
            <HStack
              style={{
                justifyContent: 'space-between',
                marginHorizontal: screenWidth(20),
                marginVertical: screenWidth(20),
              }}>
              <TextTranslate style={styles.title}>Other</TextTranslate>
            </HStack>
            <HStack
              style={{
                justifyContent: 'space-between',
                marginHorizontal: padding_horizontal,
              }}>
              <AccountCardImage
                value="25"
                title="Setting"
                images={AppImages.Setting}
                onPress={() => navigate(Routes.Settings)}
              />
              <AccountCardImage
                title="change_password"
                value="5"
                images={AppImages.ChangePassword}
                size={screenWidth(25)}
                onPress={() => navigate(Routes.ChangePassword)}
              />
            </HStack>

            <SubmitButton
              onPress={() => navigate(Routes.Login)}
              title="sign_out"
              backgroundColor={colors.mainColor}
              borderColor={colors.mainColor}
              borderWidth={screenWidth(2)}
              color={colors.white}
              marginTop={screenWidth(15)}
              marginHorizontal={screenWidth(20)}
            />
          </Box>
        }
      />
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight!,
  },
  profile: {
    width: screenWidth(130),
    height: screenWidth(130),
    borderRadius: screenWidth(130) / 2,
    borderColor: colors.white,
    borderWidth: screenWidth(5),
    marginBottom: screenWidth(20),
  },
  name: {
    color: colors.white,
    fontSize: size.font24,
    ...BattambangBold,
  },
  grayText: {
    color: colors.lightGrayColor,
    fontSize: size.font18,
    ...Battambang,
    marginBottom: screenWidth(5),
  },
  text: {
    color: colors.white,
    fontSize: size.font20,
    ...Battambang,
    paddingHorizontal: screenWidth(10),
  },
  title: {
    color: colors.black,
    fontSize: size.font20,
    ...Battambang,
  },
  seeAll: {
    color: colors.red,
    fontSize: size.font20,
    ...Battambang,
  },
});
