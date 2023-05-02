import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box, Center, HStack } from 'native-base'
import colors from '../../theme/colors'
import { size } from '../../theme/fonts'
import { Battambang } from '../../services/config/fonts'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import { style } from '../../styles/style'

const CustomerInformation = () => {
  return (
    <View style={styles.container}>
      <HStack style={{
        paddingBottom: screenWidth(15),
        marginBottom: screenWidth(10),
        borderBottomColor: colors.lowOpacityGray,
        borderBottomWidth: screenWidth(1.5)
      }} justifyContent={'space-between'} alignItems={'center'}>
        <Text style={styles.title}>Customer Information</Text>
      </HStack>
      <HStack style={styles.row}>
        <Text style={styles.grayText}>Name</Text>
        <Text style={styles.label}>Reaksmey Sunchhay</Text>
      </HStack>
      <HStack style={styles.row}>
        <Text style={styles.grayText}>Contact Number</Text>
        <Text style={styles.label}>012 123 456</Text>
      </HStack>
      <HStack style={styles.row}>
        <Text style={styles.grayText}>Address</Text>
        <Text style={{ ...styles.label, color: colors.mainColor }}>02 Street, 02 house, Phnom Penh</Text>
      </HStack>
    </View>
  )
}

export default CustomerInformation

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
    ...style.normalShadow
  },
  title: {
    color: colors.black,
    fontSize: size.font22,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: screenWidth(3),
  },
  grayText: {
    color: colors.grayColor,
    fontSize: size.font16,
    ...Battambang
  },
  label: {
    color: colors.black,
    fontSize: size.font16,
    ...Battambang
  },
})