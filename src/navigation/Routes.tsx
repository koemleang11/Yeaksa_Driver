import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../services/navigate/navigation';
import MainStack from './MainStack';
import MainTab from './MainTab';
// import {navigationRef} from '../services/navigate/navigation';
// import {useAppDispatch, useAppSelector} from '../hooks/dispatch';
// import LoadingScreen from '../components/loading/LoadingScreen';
// import MainDrawer from './MainDrawer';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
// import SplashScreen from '../container/SplashScreen';
// import NetInfo from '@react-native-community/netinfo';
// import {internetConnection} from '../redux/actions';

const Route = () => {
  // const dispatch = useAppDispatch();
  // const no_connection = useAppSelector((state: any) => state.no_connection);

  // React.useEffect(() => {
  //   const inter = setInterval(() => {
  //     const unsubscribe = NetInfo.addEventListener(
  //       (state: {isConnected: any}) => {
  //         if (!state.isConnected) {
  //           dispatch(internetConnection(true));
  //         } else {
  //           dispatch(internetConnection(false));
  //         }
  //       },
  //     );
  //     unsubscribe();
  //   }, 1000);

  //   if (no_connection) {
  //     clearInterval(inter);
  //   }
  // }, []);

  // useEffect(() => {
  //   getNotification();
  // }, []);

  // const getNotification = async () => {
  //   let allow_noti = await AsyncStorage.getItem('allowNotification');
  //   if (allow_noti == null) {
  //     await messaging().subscribeToTopic('yeaksa_news');
  //   }
  // };

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Route;

const styles = StyleSheet.create({});
