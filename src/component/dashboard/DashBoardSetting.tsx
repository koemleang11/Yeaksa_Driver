import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Center} from 'native-base';
import {TextTranslate} from '../custom/Label';
import {screenWidth} from '../../theme/layouts';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import SubmitButton from '../custom/SubmitButton';

interface Props {
  title: string;
  subtitle: string;
  icon: any;
  size?: any;
  buttonTitle: string;
  onPress: () => void;
}

const DashBoardSetting: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      <TextTranslate style={styles.label}>{props.title}</TextTranslate>
      <TextTranslate style={styles.text}>{props.subtitle}</TextTranslate>
      <Center style={styles.iconContainer}>
        <Image source={props.icon} style={styles.icon} />
      </Center>
      <SubmitButton
        onPress={props.onPress}
        title={props.buttonTitle}
        height={screenWidth(34)}
        width={'100%'}
        borderRadius={screenWidth(34) / 2}
        fontSize={size.font16}
      />
    </View>
  );
};

export default React.memo(DashBoardSetting);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: screenWidth(10),
    marginBottom: screenWidth(15),
    paddingHorizontal: screenWidth(20),
    height: screenWidth(210),
    width: screenWidth(210),
    paddingTop: screenWidth(15),
    paddingBottom: screenWidth(18),
  },
  iconContainer: {
    width: screenWidth(50),
    height: screenWidth(50),
    borderRadius: screenWidth(50),
    backgroundColor: colors.lowOpacityMain,
    alignSelf: 'center',
  },
  icon: {
    width: screenWidth(26),
    height: screenWidth(26),
  },
  label: {
    fontSize: size.font18,
    color: colors.black,
  },
  text: {
    fontSize: size.font14,
    color: colors.black,
    textAlign: 'center',
    marginTop: -screenWidth(15),
  },
});
