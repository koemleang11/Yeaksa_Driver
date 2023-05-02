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
  onPress?: () => void;
}

const DateSelectCard: React.FC<Props> = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <VStack justifyContent={'center'}>
        <Text style={styles.label}>{props.title}</Text>
      </VStack>
    </TouchableOpacity>
  );
};

export default React.memo(DateSelectCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.mainColor,
    width: screenWidth(140),
    justifyContent: 'space-between',
    borderRadius: screenWidth(10),
    marginBottom: screenWidth(15),
    paddingHorizontal: screenWidth(20),
    height: screenWidth(70),
    paddingTop: screenWidth(15),
    paddingBottom: screenWidth(10),
  },
  iconContainer: {
    width: screenWidth(46),
    height: screenWidth(46),
    borderRadius: screenWidth(46),
    backgroundColor: 'rgba(116, 118, 204, 0.4)',
    alignSelf: 'center',
  },
  label: {
    fontSize: size.font20,
    color: colors.lightGrayColor,
    textAlign: 'center',
  },
});
