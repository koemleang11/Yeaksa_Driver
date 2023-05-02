import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import BaseComponent from '../../component/BaseComponent'
import { Box, HStack, VStack } from 'native-base'
import colors from '../../theme/colors'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import { AppImages } from '../../theme/images'
import { size } from '../../theme/fonts'
import { Battambang, BattambangBold } from '../../services/config/fonts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo'

const PrivacyPolicyScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <BaseComponent title='privacy_policy' style={styles.container} disabledCloseKeyboard>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box style={{ ...styles.whiteBox, marginBottom: screenWidth(20) + insets.bottom }}>
                    <Image source={AppImages.Logo} style={styles.logo} />
                    <Box style={{
                        height: screenWidth(1.5),
                        backgroundColor: colors.lowOpacityGray,
                        marginBottom: screenWidth(10)
                    }} />
                    <Text style={styles.title}>Our Privacy & Policy</Text>
                    <Text style={styles.text}>Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, content here, making it look like readable English. Many desktop publishing packages and web page.</Text>
                    <HStack style={{ marginTop: screenWidth(10) }}>
                        <Entypo name='dot-single' size={screenWidth(32)} color={colors.black} />
                        <VStack width='90%'>
                            <Text style={styles.subTitle}>Lorem Ipsum is simply</Text>
                            <Text style={styles.description}>Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, content here, making it look like readable English.</Text>
                        </VStack>
                    </HStack>
                    <HStack style={{ marginTop: screenWidth(10) }}>
                        <Entypo name='dot-single' size={screenWidth(32)} color={colors.black} />
                        <VStack width='90%'>
                            <Text style={styles.subTitle}>Lorem Ipsum is simply</Text>
                            <Text style={styles.description}>Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, content here, making it look like readable English.</Text>
                        </VStack>
                    </HStack>
                    <HStack style={{ marginTop: screenWidth(10) }}>
                        <Entypo name='dot-single' size={screenWidth(32)} color={colors.black} />
                        <VStack width='90%'>
                            <Text style={styles.subTitle}>Lorem Ipsum is simply</Text>
                            <Text style={styles.description}>Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, content here, making it look like readable English.</Text>
                        </VStack>
                    </HStack>
                    <HStack style={{ marginTop: screenWidth(10) }}>
                        <Entypo name='dot-single' size={screenWidth(32)} color={colors.black} />
                        <VStack width='90%'>
                            <Text style={styles.subTitle}>Lorem Ipsum is simply</Text>
                            <Text style={styles.description}>Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, content here, making it look like readable English.</Text>
                        </VStack>
                    </HStack>
                </Box>
            </ScrollView>
        </BaseComponent>
    )
}

export default PrivacyPolicyScreen

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
    subTitle: {
        fontSize: size.font18,
        color: colors.black,
        ...BattambangBold,
        textAlign: 'justify',
        marginLeft: screenWidth(5)
    },
    description: {
        fontSize: size.font18,
        color: colors.grayColor,
        ...BattambangBold,
        textAlign: 'justify',
        marginLeft: screenWidth(5)
    },
})