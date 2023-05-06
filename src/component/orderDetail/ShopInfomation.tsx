import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Center, HStack} from 'native-base';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import {Battambang} from '../../services/config/fonts';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {style} from '../../styles/style';
import DirectionButton from '../custom/DirectionButton';
import {navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';

const ShopInformation = (props: any) => {
  return (
    <View style={styles.container}>
      <HStack
        style={{
          paddingBottom: screenWidth(15),
          marginBottom: screenWidth(10),
          borderBottomColor: colors.lowOpacityGray,
          borderBottomWidth: screenWidth(1.5),
          marginRight: screenWidth(20),
        }}
        alignItems={'center'}>
        <Center>
          <Image source={props.images} style={styles.icon} />
        </Center>
        <Text style={styles.title}>{props.title}</Text>
      </HStack>
      <HStack style={styles.row}>
        <Text style={styles.grayText}>Contact Number</Text>
        <Text style={styles.label}>{props.phone}</Text>
      </HStack>
      <HStack style={styles.row}>
        <Text style={styles.grayText}>Address</Text>
        <Text
          numberOfLines={2}
          style={{...styles.label, color: colors.mainColor}}>
          {props.address}
        </Text>
      </HStack>
      <HStack>
        <DirectionButton onPress={() => navigate(Routes.DeliveryPickupMap)} />
      </HStack>
    </View>
  );
};

export default ShopInformation;

const styles = StyleSheet.create({
  container: {
    marginTop: screenWidth(15),
    backgroundColor: colors.white,
    borderRadius: screenWidth(10),
    marginHorizontal: padding_horizontal,
    paddingHorizontal: screenWidth(20),
    paddingVertical: screenWidth(20),
    paddingBottom: screenWidth(15),
    marginBottom: screenWidth(10),
    ...style.normalShadow,
  },
  title: {
    color: colors.black,
    fontSize: size.font22,
    paddingLeft: screenWidth(20),
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: screenWidth(3),
  },
  grayText: {
    color: colors.grayColor,
    fontSize: size.font16,
    ...Battambang,
  },
  label: {
    color: colors.black,
    fontSize: size.font16,
    ...Battambang,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
