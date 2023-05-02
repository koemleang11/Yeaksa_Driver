import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import { screenWidth } from '../../theme/layouts'
import FastImage from 'react-native-fast-image'
import { AppImages } from '../../theme/images'
import { HStack, VStack } from 'native-base'
import { size } from '../../theme/fonts'
import { style } from '../../styles/style'

const NotificationCard = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <HStack alignItems={'center'}>
                <FastImage source={AppImages.Sunchhay} style={styles.avatar}>

                </FastImage>
                <VStack>
                    <Text style={styles.text}>Refund Order #012314434</Text>
                    <Text style={styles.grayText}>Please see detail: www.phsartech.com</Text>
                </VStack>
            </HStack>
            <Text style={styles.date}>22 April 2023, 10:45 AM</Text>
        </TouchableOpacity>
    )
}

export default React.memo(NotificationCard)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        paddingHorizontal: screenWidth(20),
        marginBottom: screenWidth(15),
        height: screenWidth(90),
        justifyContent: 'space-between',
        paddingVertical: screenWidth(10),
        ...style.normalShadow
    },
    avatar: {
        width: screenWidth(50),
        height: screenWidth(50),
        borderRadius: screenWidth(50),
        marginRight: screenWidth(15),
    },
    text: {
        fontSize: size.font18,
        color: colors.black,
    },
    grayText: {
        fontSize: size.font14,
        color: colors.grayColor,
    },
    date: {
        fontSize: size.font14,
        color: colors.grayColor,
        alignSelf: 'flex-end'
    },
})