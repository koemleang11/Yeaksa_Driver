import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppImages} from '../../theme/images';
import {HStack} from 'native-base';
import {screenWidth} from '../../theme/layouts';
import {goBack} from '../../services/navigate/navigation';
import {PoppinBold} from '../../services/config/fonts';
import colors from '../../theme/colors';

const CustomHeader = (props: any) => {
  return (
    <HStack
      style={{
        height: screenWidth(70),
        backgroundColor: props.colors,
        marginHorizontal: screenWidth(20),
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => goBack()}>
        <View style={styles.container}>
          <Image
            source={AppImages.arrowBack}
            style={{height: screenWidth(20)}}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>{props.text}</Text>
      <Text> </Text>
    </HStack>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: screenWidth(50),
    width: screenWidth(50),
    backgroundColor: '#ffffff25',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: screenWidth(15),
  },
  title: {
    fontSize: 24,
    ...PoppinBold,
    color: colors.white,
  },
});
