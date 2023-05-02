import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Box, HStack, useDisclose } from 'native-base'
import colors from '../../theme/colors'
import FastImage from 'react-native-fast-image'
import { metrics, screenWidth } from '../../theme/layouts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { size } from '../../theme/fonts'
import { Battambang, BattambangBold } from '../../services/config/fonts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { accountList } from '../../temp/Account'
import { TextTranslate } from '../../component/custom/Label'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { goBack, navigate, reset } from '../../services/navigate/navigation'
import { Routes } from '../../temp/Routes'
import CustomModal from '../../component/modal/CustomModal'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch'
import { loadLoading, loadRefreshing } from '../../redux/actions'
import { create } from 'apisauce'
import { baseUrl } from '../../services/api/index.service'
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SpinnerLoading from '../../component/loading/SpinnerLoading'
import { requestProfile } from '../../redux/actions/profile'

const AccountScreen = () => {

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.loading);
  const refreshing = useAppSelector(state => state.refreshing);
  const profileState = useAppSelector(state => state.profile.data);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    dispatch(loadLoading(true));
    dispatch(requestProfile());
  }, []);

  const onRefresh = () => {
    dispatch(loadRefreshing(true));
    dispatch(requestProfile());
  }

  const handleLogout = async () => {
    onClose();
    dispatch(loadLoading(true));
    let fcm_token = await messaging().getToken();
    let token = await AsyncStorage.getItem('@token');
    const apiSauce = create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    await apiSauce.post('logout', { fcm_token }).then(async (response: any) => {
      try {
        if (response.data.message === true) {
          await AsyncStorage.removeItem('@token')
          reset(Routes.Login);
          dispatch(loadLoading(false));
        } else {
          dispatch(loadLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  const _renderItem = useCallback(({ item }: any) => {
    return <TouchableOpacity
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
        marginBottom: screenWidth(1)
      }}>
      <HStack alignItems={'center'}>
        <FastImage source={item.icon} style={{ width: screenWidth(30), height: screenWidth(30), marginRight: screenWidth(15) }} />
        <TextTranslate style={styles.title}>{item.title}</TextTranslate>
      </HStack>
      <Ionicons name='chevron-forward' size={screenWidth(30)} color={colors.white} />
    </TouchableOpacity>
  }, [accountList]);

  return (
    <>
      <Box style={styles.container}>
        <SafeAreaView style={{ backgroundColor: colors.mainColor }} />
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          data={null}
          renderItem={() => <></>}
          ListHeaderComponent={
            <Box alignItems='center' style={{ marginTop: screenWidth(60), paddingBottom: screenWidth(40) }}>
              <FastImage source={{ uri: profileState?.profile }} style={styles.profile}>

              </FastImage>
              <Text style={styles.name}>{profileState?.name ?? 'Fullname'}</Text>
              <Text style={styles.grayText}>{`Seller ID: ${profileState?.supplier_no ?? '00000000'}`}</Text>
              <HStack alignItems={'center'} style={{ marginBottom: screenWidth(25) }}>
                <AntDesign name='star' color={colors.yellowColor} size={screenWidth(24)} />
                <Text style={styles.text}>5.0</Text>
                <MaterialIcons name='verified' color={colors.green} size={screenWidth(24)} />
                <Text style={styles.text}>Verified</Text>
              </HStack>
              <FlatList
                data={accountList}
                renderItem={_renderItem}
              />
            </Box>
          }
        />
        <TouchableOpacity onPress={goBack} style={{
          position: 'absolute',
          top: Platform.OS == 'ios' ? insets.top : StatusBar.currentHeight! + screenWidth(10),
          right: screenWidth(5),
          paddingHorizontal: screenWidth(10)
        }}>
          <AntDesign name='close' color={colors.white} size={screenWidth(34)} />
        </TouchableOpacity>
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          title='are_you_sure'
          subTitle='you_want_to_logout'
          firstButton='no'
          secondButton='yes'
          icon={<FontAwesome name='question' color={colors.white} size={screenWidth(44)} />}
          firstButtonPress={onClose}
          secondButtonPress={handleLogout}
        />
      </Box>
      {
        loading && <SpinnerLoading />
      }
    </>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainColor,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight!
  },
  profile: {
    width: screenWidth(130),
    height: screenWidth(130),
    borderRadius: screenWidth(130) / 2,
    borderColor: colors.white,
    borderWidth: screenWidth(5),
    marginBottom: screenWidth(20)
  },
  name: {
    color: colors.white,
    fontSize: size.font24,
    ...BattambangBold
  },
  grayText: {
    color: colors.lightGrayColor,
    fontSize: size.font18,
    ...Battambang,
    marginBottom: screenWidth(5)
  },
  text: {
    color: colors.white,
    fontSize: size.font18,
    ...Battambang,
    paddingHorizontal: screenWidth(10)
  },
  title: {
    color: colors.white,
    fontSize: size.font18,
    ...Battambang,
  }
})