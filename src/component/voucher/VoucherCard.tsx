import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { Center, HStack } from 'native-base'
import { size } from '../../theme/fonts'
import { Battambang, BattambangBold } from '../../services/config/fonts'

const VoucherCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>For Product</Text>
            <HStack style={styles.row}>
                <Text style={styles.label}>Voucher Code</Text>
                <Text style={styles.grayText}>00023775</Text>
            </HStack>
            <HStack style={styles.row}>
                <Text style={styles.label}>Start Date</Text>
                <Text style={styles.grayText}>12 April 2023, 10:15AM</Text>
            </HStack>
            <HStack style={styles.row}>
                <Text style={styles.label}>Due Date</Text>
                <Text style={styles.grayText}>12 April 2023, 10:15AM</Text>
            </HStack>
            <HStack style={styles.row}>
                <Text style={styles.label}>Status</Text>
                <Center style={styles.status}>
                    <Text style={{ ...styles.grayText, color: colors.yellowColor }}>Approved</Text>
                </Center>
            </HStack>
        </View>
    )
}

export default VoucherCard

const styles = StyleSheet.create({
    container: {
        borderRadius: screenWidth(10),
        backgroundColor: colors.white,
        marginBottom: screenWidth(15),
        paddingHorizontal: screenWidth(25),
        paddingVertical: screenWidth(15),
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: colors.black,
        fontSize: size.font20,
        ...BattambangBold,
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
    status: {
        paddingVertical: screenWidth(5),
        paddingHorizontal: screenWidth(15),
        backgroundColor: colors.lightYellow
    }
})