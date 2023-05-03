import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../theme/colors';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {Avatar, Box, Center, HStack, VStack} from 'native-base';
import {AppImages} from '../../theme/images';
import {size} from '../../theme/fonts';
import {TextTranslate} from '../custom/Label';
import {style} from '../../styles/style';
import ProductCard from '../orderDetail/ProductCard';
import SubmitButton from '../custom/SubmitButton';
import {navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommissionCard = (props: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigate(Routes.OrderDetail)}
      style={styles.container}>
      <HStack
        style={{
          marginHorizontal: screenWidth(40),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <HStack
          style={{
            alignItems: 'center',
          }}>
          <Center>
            <Image source={props.images} style={styles.logo} />
          </Center>
          <Text style={styles.name}>{props.name}</Text>
        </HStack>
        <Text>{props.title}</Text>
      </HStack>
      <HStack
        style={{
          ...style.row,
          paddingHorizontal: padding_horizontal,
          paddingVertical: screenWidth(15),
          borderTopColor: colors.lowOpacityGray,
          borderTopWidth: screenWidth(1.5),
          marginTop: screenWidth(12),
          marginHorizontal: screenWidth(30),
        }}
        justifyContent="space-between"
        alignItems="center">
        <VStack>
          <HStack
            style={{paddingVertical: 10, justifyContent: 'space-between'}}>
            <Text style={styles.label}> Order Date:</Text>
            <Text style={styles.text}>{props.date}</Text>
          </HStack>
          <HStack
            style={{paddingVertical: 10, justifyContent: 'space-between'}}>
            <Text style={styles.label}> Total Commission:</Text>
            <Text style={{...styles.text, color: colors.green}}>
              {props.commision}
            </Text>
          </HStack>
          <HStack
            style={{paddingVertical: 10, justifyContent: 'space-between'}}>
            <Text style={styles.label}> Statuse:</Text>
            <Text style={{...styles.text, color: colors.green}}>
              {props.Statuse}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <HStack
        style={{
          ...style.row,
          paddingHorizontal: padding_horizontal,
          paddingVertical: screenWidth(15),
          borderTopColor: colors.lowOpacityGray,
          borderTopWidth: screenWidth(1.5),
          marginTop: screenWidth(12),
          marginHorizontal: screenWidth(30),
        }}>
        <HStack>
          <HStack>
            <Center>
              <Image
                source={AppImages.LocationPin}
                style={styles.locationIcon}
              />
            </Center>
            <VStack>
              <Text style={styles.text}>{props.location}</Text>
            </VStack>
          </HStack>
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default React.memo(CommissionCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: screenWidth(10),
    paddingTop: screenWidth(20),
    marginBottom: screenWidth(15),
    ...style.normalShadow,
    marginHorizontal: screenWidth(10),
    elevation: screenWidth(5),
  },
  name: {
    fontSize: size.font22,
    color: colors.black,
    textAlign: 'center',
    paddingHorizontal: screenWidth(20),
  },
  date: {
    fontSize: size.font14,
    color: colors.grayColor,
  },
  statusContainer: {
    width: screenWidth(120),
    borderRadius: screenWidth(50),
    height: screenWidth(35),
  },
  status: {
    fontSize: size.font16,
  },
  label: {
    color: colors.grayColor,
    fontSize: size.font16,
    paddingRight: screenWidth(20),
  },
  text: {
    color: colors.black,
    fontSize: size.font16,
    paddingLeft: screenWidth(20),
  },
  logo: {
    height: screenWidth(50),
    width: screenWidth(50),
    borderRadius: screenWidth(50),
  },
  locationIcon: {
    height: screenWidth(28),
    width: screenWidth(28),
  },
});
