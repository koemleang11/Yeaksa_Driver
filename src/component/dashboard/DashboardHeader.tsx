import {Box, Center, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  Switch,
  StatusBar,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import {AppImages} from '../../theme/images';
import {screenWidth} from '../../theme/layouts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {size} from '../../theme/fonts';
import {BattambangBold} from '../../services/config/fonts';
import SelectDateDropDown from './SelectDateDropDown';
import {style} from '../../styles/style';
import {navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';
import {dateFilter} from '../../temp/Date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const DashboardHeader = () => {
  const [selected, setSelected] = useState(dateFilter[0]);
  const [openSelected, setOpenSelected] = useState(false);
  const [notification, setNotification] = useState(false);
  const [initial, setInitial] = useState(true);

  const getNotification = async () => {
    let allow_noti = await AsyncStorage.getItem('allowNotification');
    if (allow_noti != null) {
      if (allow_noti == '1') setNotification(true);
      else setNotification(false);
    } else {
      setNotification(true);
    }
    setTimeout(() => {
      setInitial(false);
    }, 250);
  };

  useEffect(() => {
    if (!initial) onUpdateNotification();
  }, [notification]);

  const onUpdateNotification = async () => {
    if (notification) {
      await messaging().subscribeToTopic('public');
    } else {
      await messaging().unsubscribeFromTopic('public');
    }
    await AsyncStorage.setItem('allowNotification', notification ? '1' : '0');
  };

  return (
    <HStack style={styles.container}>
      <HStack>
        <Center style={styles.logoContainer}>
          <Image source={AppImages.Sunchhay} style={styles.logo} />
          <Box style={styles.active}></Box>
        </Center>

        <VStack
          justifyContent={'space-between'}
          style={{paddingVertical: screenWidth(5)}}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Reaksmey Sunchhay</Text>
        </VStack>
      </HStack>
      <Switch
        trackColor={{false: colors.red, true: colors.green}}
        thumbColor={notification ? colors.white : colors.white}
        ios_backgroundColor={colors.lightGrayColor}
        onValueChange={() => {
          setNotification(!notification);
        }}
        value={notification}
      />
    </HStack>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth(20),
    paddingVertical: screenWidth(10),
    ...style.normalShadow,

    paddingTop:
      Platform.OS == 'ios' ? 0 : StatusBar.currentHeight! + screenWidth(10),
    zIndex: 100,
  },
  logoContainer: {
    padding: screenWidth(10),
    borderRadius: screenWidth(10),
    marginRight: screenWidth(15),
  },
  logo: {
    width: screenWidth(50),
    height: screenWidth(50),
    overflow: 'hidden',
    borderRadius: screenWidth(50),
  },
  title: {
    fontSize: size.font24,
    color: colors.black,
  },
  subtitle: {
    fontSize: size.font20,
    color: colors.black,
  },
  active: {
    backgroundColor: colors.green,
    height: screenWidth(10),
    width: screenWidth(10),
    borderRadius: screenWidth(10),
    top: screenWidth(-10),
    marginLeft: screenWidth(30),
  },
});
