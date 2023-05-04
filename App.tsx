import {
  StatusBar,
  Platform,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Route from './src/navigation/Routes';
import {NativeBaseProvider} from 'native-base';
import messaging from '@react-native-firebase/messaging';
// import SplashScreen from './src/container/SplashScreen';
import {useAppDispatch} from './src/hooks/dispatch';
import DeviceInfo from 'react-native-device-info';
import {baseUrl} from './src/services/api/index.service';
// import { loadLoading } from './src/redux/actions';
// import Keychain from 'react-native-keychain';
// import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppProvider} from './src/hooks/provider';
import SplashScreen from './src/container/auth/SplashScreen';
import colors from './src/theme/colors';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import LanguageScreen from './src/container/auth/LanguageScreen';
// messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
//   console.log(remoteMessage)
// });

// messaging().subscribeToTopic('yeaksa_news');

const App = () => {
  const [hidden, setHidden] = useState(false);
  const dispatch = useAppDispatch();

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const checkPermission = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log('error :>> ', error);
      });
  };
  async function requestUserPermission() {
    let fcm_token = await messaging().getToken();

    console.log('======FCM Token======');
    console.log(fcm_token);

    const authStatus = await messaging().requestPermission();
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
    }
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    checkPermission();
    requestUserPermission();
    Platform.OS == 'android' && hasAndroidPermission();
  }, []);

  // useEffect(() => {
  //   const init = async () => {
  //     await RNBootSplash.hide({ fade: true });
  //   };
  //   init();
  // }, []);

  async function getFontSize() {
    await AsyncStorage.getItem('fontSize');
  }

  useEffect(() => {
    getFontSize();
    setHidden(true);
    setTimeout(() => {
      setHidden(false);
    }, 3500);
  }, []);

  // useEffect(() => {
  //   dispatch(loadLoading(true));
  //   async function _getDeviceInfo() {
  //     let uniqueId = DeviceInfo.getUniqueIdSync();
  //     let model = DeviceInfo.getModel();
  //     let deviceType = DeviceInfo.getDeviceType();
  //     let os = Platform.OS;
  //     _mobileAuthorize(uniqueId, deviceType, model, os);
  //   }
  //   _getDeviceInfo();
  // }, []);

  // function _mobileAuthorize(
  //   deviceId: string,
  //   deviceType: string,
  //   model: string,
  //   os: string,
  // ) {
  //   fetch(baseUrl + 'authorize', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       device_id: deviceId,
  //       device_name: deviceType,
  //       model: model,
  //       os: os,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(async responseData => {
  //       let resData: any = JSON.parse(JSON.stringify(responseData));
  //       if (resData.status_code == 200) {
  //         let first_key = resData.data.secret_key;
  //         let second_key = resData.data.secret_iv;
  //         await Keychain.setGenericPassword(first_key, second_key);
  //         dispatch(loadLoading(false));
  //       } else dispatch(loadLoading(false));
  //     });
  // }

  return (
    <AppProvider>
      <NativeBaseProvider>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <Route />
        {/* {hidden ? <SplashScreen /> : <LanguageScreen />} */}
      </NativeBaseProvider>
    </AppProvider>
  );
};

export default App;
