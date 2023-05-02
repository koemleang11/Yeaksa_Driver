import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Box, Center, HStack } from 'native-base'
import colors from '../../theme/colors'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import { style } from '../../styles/style'
import { size } from '../../theme/fonts'
import { Battambang } from '../../services/config/fonts'
import { TextTranslate } from '../custom/Label'
import { navigate } from '../../services/navigate/navigation'
import { Routes } from '../../temp/Routes'

const CardItem = () => {
    return (
        <TouchableOpacity onPress={()=>navigate(Routes.OrderDetail)} style={styles.container}>
            <HStack style={styles.row}>
                <TextTranslate style={styles.text}>order_id</TextTranslate>
                <Text style={styles.grayText}>0012375</Text>
            </HStack>
            <HStack style={styles.row}>
                <Text style={styles.text}>Price</Text>
                <Text style={styles.grayText}>$120.00</Text>
            </HStack>
            <HStack style={styles.row}>
                <Text style={styles.text}>Order Date</Text>
                <Text style={styles.grayText}>24-08-2022</Text>
            </HStack>
            <HStack style={styles.row}>
                <Text style={styles.text}>Payment Status</Text>
                <Text style={{ ...styles.grayText, color: colors.green }}>Paid</Text>
            </HStack>
            <HStack style={{...styles.row, paddingVertical: screenWidth(6)}}>
                <Text style={styles.text}>Delivery Option</Text>
                <Center style={{ ...styles.status, backgroundColor: colors.lightYellow }}>
                    <Text style={{ ...styles.grayText, color: colors.yellowColor }}>{'Pending'}</Text>
                </Center>
            </HStack>
        </TouchableOpacity>
    )
}

export default React.memo(CardItem)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        paddingHorizontal: screenWidth(20),
        paddingVertical: screenWidth(12),
        marginBottom: screenWidth(10),
        ...style.normalShadow
    },
    text: {
        color: colors.black,
        fontSize: size.font16,
    },
    grayText: {
        color: colors.grayColor,
        fontSize: size.font16,
        ...Battambang,
    },
    status: {
        borderRadius: screenWidth(8),
        paddingVertical: screenWidth(6),
        width: screenWidth(110)
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: screenWidth(2)
    }
})