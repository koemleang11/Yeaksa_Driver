import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Center, HStack, VStack} from 'native-base';
import {TextTranslate} from '../custom/Label';
import {screenWidth} from '../../theme/layouts';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import {Battambang} from '../../services/config/fonts';
import {AppImages} from '../../theme/images';

interface Props {
  title: string;
  icon: any;
  value: any;
  size?: any;
  onPress?: () => void;
}

const AccountCard: React.FC<Props> = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <VStack>
        <VStack
          justifyContent={'center'}
          alignItems={'center'}
          alignSelf={'center'}>
          <Text style={styles.value}>{props.value}</Text>
          <Text style={styles.label}>{props.title}</Text>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
};

export default React.memo(AccountCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrayColor,
    width: screenWidth(210),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: screenWidth(10),
    marginBottom: screenWidth(15),
    paddingHorizontal: screenWidth(20),
    height: screenWidth(100),
  },
  iconContainer: {
    width: screenWidth(46),
    height: screenWidth(46),
    borderRadius: screenWidth(46),
    backgroundColor: 'rgba(116, 118, 204, 0.4)',
  },
  label: {
    fontSize: size.font20,
    color: colors.black,
  },
  value: {
    fontSize: size.font22,
    color: colors.red,
    ...Battambang,
  },
  icon: {
    width: screenWidth(26),
    height: screenWidth(26),
    tintColor: colors.black,
  },
});
