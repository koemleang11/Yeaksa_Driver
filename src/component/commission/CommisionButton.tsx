import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {metrics, screenWidth} from '../../theme/layouts';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import {style} from '../../styles/style';
import {HStack, Center, VStack} from 'native-base';
import {color} from 'native-base/lib/typescript/theme/styled-system';
// import { TextTranslate } from './Label'

const ComissionButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      style={[styles.container, {...props}]}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <Center>
          <Image source={props.images} style={styles.icon} />
        </Center>
        <VStack>
          <Text style={[styles.Value]}>{props.value}</Text>
          <Text style={[styles.text]}>{props.title}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default React.memo(ComissionButton);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    height: screenWidth(70),
    borderRadius: screenWidth(15),
    paddingHorizontal: screenWidth(20),
    justifyContent: 'center',
    marginBottom: screenWidth(10),
  },
  text: {
    color: colors.white,
  },
  Value: {
    fontSize: size.font22,
    color: colors.white,
    fontWeight: 'bold',
  },
  icon: {
    height: screenWidth(30),
    width: screenWidth(30),
  },
});
