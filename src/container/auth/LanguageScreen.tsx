import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppImages} from '../../theme/images';
import {screenWidth} from '../../theme/layouts';
import {Avatar, Box, HStack} from 'native-base';
import {style} from '../../styles/style';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import {TextTranslate} from '../../component/custom/Label';
import {navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../hooks/dispatch';
import {loadLanguage} from '../../redux/actions';
import AuthComponent from '../../component/AuthComponent';
var kh = require('../../res/lang/kh.json');
var en = require('../../res/lang/en.json');

const LanguageScreen = () => {
  const dispatch = useAppDispatch();
  const onPress = async (language: any) => {
    if (language == 'kh') {
      await AsyncStorage.setItem('@lang', 'kh');
      dispatch(loadLanguage(kh));
    } else {
      await AsyncStorage.setItem('@lang', 'en');
      dispatch(loadLanguage(en));
    }
    navigate(Routes.Login);
  };
  return (
    <AuthComponent disabledBackButton>
      <Box style={styles.whiteBox}>
        <TextTranslate style={styles.title}>language</TextTranslate>
        <TextTranslate
          style={{
            ...styles.subtitle,
            marginBottom: screenWidth(40),
            marginTop: screenWidth(10),
          }}>
          please_choose_language_below
        </TextTranslate>
        <TouchableOpacity onPress={() => onPress('kh')} style={styles.button}>
          <Avatar source={AppImages.KhmerFlag} size={screenWidth(40)} />
          <TextTranslate style={styles.subtitle}>khmer</TextTranslate>
          <Box style={{width: screenWidth(40)}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate(Routes.Login)}
          style={styles.button}>
          <Avatar source={AppImages.EnglandFlag} size={screenWidth(40)} />
          <TextTranslate style={styles.subtitle}>english</TextTranslate>
          <Box style={{width: screenWidth(40)}} />
        </TouchableOpacity>
      </Box>
      <HStack
        alignItems={'center'}
        style={{marginTop: screenWidth(80), alignSelf: 'center'}}>
        <Box
          style={{
            backgroundColor: colors.white,
            width: screenWidth(60),
            height: screenWidth(2),
          }}
        />
        <Text
          style={{
            ...styles.subtitle,
            color: colors.white,
            fontSize: size.font20,
          }}>
          DRIVER APP
        </Text>
        <Box
          style={{
            backgroundColor: colors.white,
            width: screenWidth(60),
            height: screenWidth(2),
          }}
        />
      </HStack>
    </AuthComponent>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  whiteBox: {
    width: screenWidth(420),
    borderRadius: screenWidth(25),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    paddingTop: screenWidth(60),
    paddingBottom: screenWidth(50),
    paddingHorizontal: screenWidth(30),
    overflow: 'hidden',
  },
  title: {
    fontSize: size.font28,
    color: colors.black,
  },
  subtitle: {
    fontSize: size.font22,
    color: colors.black,
  },
  button: {
    ...style.row,
    width: '100%',
    backgroundColor: colors.white,
    height: screenWidth(65),
    borderRadius: screenWidth(10),
    paddingHorizontal: screenWidth(30),
    marginBottom: screenWidth(20),
    ...style.normalShadow,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
