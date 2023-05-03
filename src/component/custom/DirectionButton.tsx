import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {metrics, screenWidth} from '../../theme/layouts';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import {style} from '../../styles/style';
import {TextTranslate} from './Label';
import {HStack} from 'native-base';
import {AppImages} from '../../theme/images';

const SubmitButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      style={[styles.container, {...props}]}>
      <HStack justifyContent={'center'} alignItems={'center'}>
        <Image source={AppImages.Map} style={styles.icon} />
        <Text
          style={[
            styles.text,
            {
              color: props.color ? props.color : colors.white,
              fontSize: props.fontSize ? props.fontSize : size.font20,
            },
          ]}>
          Get Direction
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default React.memo(SubmitButton);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    height: screenWidth(60),
    width: screenWidth(400),
    borderRadius: screenWidth(55),
    ...style.normalShadow,
    marginTop: screenWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: colors.white,
    paddingLeft: screenWidth(20),
  },
  icon: {
    height: screenWidth(40),
    width: screenWidth(40),
    tintColor: colors.white,
  },
});
