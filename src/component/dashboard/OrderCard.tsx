import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {Center, HStack, VStack} from 'native-base';
import {AppImages} from '../../theme/images';
import {size} from '../../theme/fonts';
import {style} from '../../styles/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextTranslate} from '../custom/Label';

const OrderCard = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <HStack
        style={{
          marginHorizontal: screenWidth(40),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <HStack
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Center>
            <Image source={props.images} style={styles.logo} />
          </Center>
          <Text style={styles.name}>{props.title}</Text>
        </HStack>
        <Center>
          <Ionicons
            name="chevron-forward-outline"
            size={screenWidth(30)}
            color={colors.black}
          />
        </Center>
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
        <View>
          <HStack style={styles.row}>
            <TextTranslate style={styles.label}>order_number</TextTranslate>
            <Text style={styles.text}> {props.order}</Text>
          </HStack>
          <HStack style={styles.row}>
            <TextTranslate style={styles.label}>order_date</TextTranslate>
            <Text style={styles.text}>{props.date}</Text>
          </HStack>
          <HStack style={styles.row}>
            <TextTranslate style={styles.label}>order_statuse</TextTranslate>
            <Text style={{...styles.text, color: colors.green}}>
              {props.Statuse}
            </Text>
          </HStack>
        </View>
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

export default React.memo(OrderCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: screenWidth(10),
    paddingTop: screenWidth(20),
    marginBottom: screenWidth(15),
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
  row: {
    justifyContent: 'space-between',
    paddingVertical: screenWidth(10),
  },
});
