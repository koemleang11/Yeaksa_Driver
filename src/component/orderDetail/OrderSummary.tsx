import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box, Center, HStack, VStack } from 'native-base'
import colors from '../../theme/colors'
import { size } from '../../theme/fonts'
import { Battambang } from '../../services/config/fonts'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import { style } from '../../styles/style'

const OrderSummary = () => {
  return (
    <View style={styles.container}>
      <HStack style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.grayText}>$745.00</Text>
      </HStack>
      <HStack style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.grayText}>$5.00</Text>
      </HStack>
      <HStack style={styles.row}>
        <Text style={styles.label}>Delivery Voucher</Text>
        <Text style={styles.grayText}>-$5.00</Text>
      </HStack>
      <HStack style={styles.row}>
        <Text style={styles.label}>Seller Voucher</Text>
        <Text style={styles.grayText}>-$5.00</Text>
      </HStack>
      <HStack justifyContent={'space-between'} alignItems={'center'} style={{
        paddingVertical: screenWidth(6),
        marginTop: screenWidth(5),
        backgroundColor: colors.lowOpacityMain,
        paddingHorizontal: screenWidth(20)
      }}>
        <VStack>
          <Text style={styles.label}>Grand Total</Text>
          <Text style={styles.label}>{`[Include VAT]`}</Text>
        </VStack>
        <Text style={{ ...styles.grayText, color: colors.redColor }}>$725.00</Text>
      </HStack>
    </View>
  )
}

export default OrderSummary

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: screenWidth(10),
    marginHorizontal: padding_horizontal,
    paddingTop: screenWidth(20),
    marginBottom: screenWidth(10),
    ...style.normalShadow,
    overflow: 'hidden'
  },
  title: {
    color: colors.black,
    fontSize: size.font22,
  },
  label: {
    color: colors.black,
    fontSize: size.font16,
    ...Battambang
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: screenWidth(3),
    paddingHorizontal: screenWidth(20)
  },
  grayText: {
    color: colors.grayColor,
    fontSize: size.font16,
    ...Battambang
  }
})