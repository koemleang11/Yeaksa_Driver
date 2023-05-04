import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Center, HStack} from 'native-base';
import colors from '../../theme/colors';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {size} from '../../theme/fonts';
import ProductCard from './ProductCard';
import {Battambang} from '../../services/config/fonts';
import {style} from '../../styles/style';

const OrderItem = (props: any) => {
  return (
    <View>
      <View style={styles.container}>
        <HStack
          style={{
            paddingBottom: screenWidth(20),
          }}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text style={styles.title}>Order Summary</Text>
        </HStack>
        <HStack style={styles.row}>
          <Text style={styles.grayText}>Order Number</Text>
          <Text style={styles.label}>{props.orderNumber}</Text>
        </HStack>
        <HStack style={styles.row}>
          <Text style={styles.grayText}>Order Date</Text>
          <Text style={styles.label}>{props.date}</Text>
        </HStack>
        <HStack style={styles.row}>
          <Text style={styles.grayText}>Order Statuse</Text>
          <Text style={{...styles.label, color: colors.green}}>
            {props.Statuse}
          </Text>
        </HStack>
        <HStack style={styles.row}>
          <Text style={styles.grayText}>Distance</Text>
          <Text style={styles.label}>{props.Distance}</Text>
        </HStack>
        <HStack style={styles.row}>
          <Text style={styles.grayText}>Payment Method</Text>
          <Text style={styles.label}>{props.payment}</Text>
        </HStack>
        <HStack style={styles.row}>
          <Text style={styles.grayText}>Delivery Fee</Text>
          <Text style={{...styles.label, color: colors.green}}>$1.00</Text>
        </HStack>
        <HStack style={styles.row}>
          <Text style={styles.grayText}>Total Amount</Text>
          <Text style={{...styles.label, color: colors.green}}>
            {props.total}
          </Text>
        </HStack>
      </View>
      <HStack
        style={{
          paddingHorizontal: padding_horizontal / 2,
          position: 'absolute',
          top: screenWidth(60),
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <Box
          style={{
            height: screenWidth(1),
            flex: 1,
            backgroundColor: colors.lightGrayColor,
            marginHorizontal: screenWidth(20),
          }}
        />
      </HStack>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
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
  },
  status: {
    paddingHorizontal: screenWidth(20),
    paddingVertical: screenWidth(5),
    borderRadius: screenWidth(20),
    backgroundColor: colors.lightYellow,
  },
  statusText: {
    color: colors.yellowColor,
    fontSize: size.font16,
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
  smallCircle: {
    width: screenWidth(22),
    height: screenWidth(22),
    backgroundColor: colors.backgroundColor,
    borderRadius: screenWidth(20),
  },
});
