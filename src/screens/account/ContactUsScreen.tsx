import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import BaseComponent from '../../component/BaseComponent'
import { Box, HStack } from 'native-base'
import colors from '../../theme/colors'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import { AppImages } from '../../theme/images'
import { size } from '../../theme/fonts'
import { Battambang, BattambangBold } from '../../services/config/fonts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ContactUsScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <BaseComponent title='contact_us' style={styles.container} disabledCloseKeyboard>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box style={{ ...styles.whiteBox, marginBottom: screenWidth(20) + insets.bottom }}>
                    <Image source={AppImages.Logo} style={styles.logo} />
                    <Box style={{
                        height: screenWidth(1.5),
                        backgroundColor: colors.lowOpacityGray,
                        marginBottom: screenWidth(10)
                    }} />
                    <Text style={styles.title}>Who we are?</Text>
                    <Text style={styles.text}>Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, content here, making it look like readable English. Many desktop publishing packages and web page.</Text>
                    <HStack alignItems={'center'} style={{marginTop: screenWidth(20)}}>
                        <Ionicons name='location' size={screenWidth(28)} color={colors.mainColor} />
                        <Text style={{...styles.contact, marginLeft: screenWidth(12)}}>02 Street 02 House, Phnom Penh, Cambodia</Text>
                    </HStack>
                    <HStack alignItems={'center'} style={{marginTop: screenWidth(20)}}>
                        <Ionicons name='mail' size={screenWidth(25)} color={colors.mainColor} />
                        <Text style={styles.contact}>phsartech@gmail.com</Text>
                    </HStack>
                    <HStack alignItems={'center'} style={{marginTop: screenWidth(20)}}>
                        <Ionicons name='call' size={screenWidth(25)} color={colors.mainColor} />
                        <Text style={styles.contact}>(+855) 87 286 868</Text>
                    </HStack>
                </Box>
            </ScrollView>
        </BaseComponent>
    )
}

export default ContactUsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: padding_horizontal
    },
    whiteBox: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        marginTop: screenWidth(20),
        paddingHorizontal: screenWidth(20),
        paddingVertical: screenWidth(25),
        paddingBottom: screenWidth(40)
    },
    logo: {
        width: screenWidth(200),
        height: screenWidth(170),
        alignSelf: 'center'
    },
    title: {
        fontSize: size.font22,
        color: colors.black,
        ...BattambangBold
    },
    text: {
        fontSize: size.font18,
        color: colors.grayColor,
        ...Battambang,
        textAlign: 'justify'
    },
    contact: {
        fontSize: size.font18,
        color: colors.black,
        ...Battambang,
        textAlign: 'justify',
        marginLeft: screenWidth(15)
    },
})