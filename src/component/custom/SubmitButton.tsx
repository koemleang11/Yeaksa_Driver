import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {metrics, screenWidth} from '../../theme/layouts';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import {style} from '../../styles/style';
import {TextTranslate} from './Label';

const SubmitButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      style={[styles.container, {...props}]}>
      <Text
        style={[
          styles.text,
          {
            color: props.color ? props.color : colors.white,
            fontSize: props.fontSize ? props.fontSize : size.font20,
          },
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(SubmitButton);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    height: screenWidth(60),
    borderRadius: screenWidth(55),
    ...style.center,
    // ...style.normalShadow
  },
  text: {
    color: colors.white,
  },
});
