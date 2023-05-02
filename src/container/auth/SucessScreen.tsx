import {SafeAreaView, StatusBar, StyleSheet, Text, Image} from 'react-native';
import colors from '../../theme/colors';
import {VStack} from 'native-base';
import {AppImages} from '../../theme/images';
import {screenWidth} from '../../theme/layouts';
import {PoppinBold} from '../../services/config/fonts';
import React from 'react';

const SucessScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.mainColor}}>
      <StatusBar translucent={false} backgroundColor={colors.mainColor} />
      <VStack
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={AppImages.Sucess}
          style={{height: screenWidth(80), width: screenWidth(80)}}
        />
        <Text
          style={{
            fontSize: 28,
            marginTop: 10,
            color: colors.white,
            ...PoppinBold,
          }}>
          Successfully
        </Text>
        <Text
          style={{fontSize: 18, color: colors.lightGrayColor, marginTop: 10}}>
          Your password have been reseted
        </Text>
      </VStack>
    </SafeAreaView>
  );
};

export default SucessScreen;

const styles = StyleSheet.create({});
