import { Image, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Box, Center, HStack, VStack } from 'native-base';
import { TextTranslate } from './custom/Label';
import { screenWidth } from '../theme/layouts';
import colors from '../theme/colors';
import { goBack } from '../services/navigate/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { style } from '../styles/style';
import { size } from '../theme/fonts';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import { AppImages } from '../theme/images';
import SpinnerLoading from './loading/SpinnerLoading';
import { useAppSelector } from '../hooks/dispatch';

interface Props {
    children?: any;
    title?: string;
    style?: any;
    keyboardBackgroundColor?: any;
    disabledCloseKeyboard?: boolean;
}

const ParentComponent: React.FC<Props> = props => {
    const loading = useAppSelector(state => state.loading);
    return (
        <>
            <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
            <StatusBar barStyle={'dark-content'} />
            <HStack style={{
                ...styles.header,
                paddingTop: StatusBar.currentHeight,
                height: screenWidth(60) + StatusBar.currentHeight!
            }}>
                <TouchableOpacity onPress={goBack} style={styles.button}>
                    <Ionicons name='chevron-back-outline' size={screenWidth(30)} color={colors.grayColor} />
                </TouchableOpacity>
                <TextTranslate style={styles.title}>{props.title}</TextTranslate>
                <Box style={{ width: screenWidth(30) }} />
            </HStack>
            <Center style={{
                width: screenWidth(100),
                height: screenWidth(100),
                borderRadius: screenWidth(15),
                backgroundColor: colors.mainColor,
                alignSelf: 'center',
                marginVertical: screenWidth(30)
            }}>
                <Image source={AppImages.Logo} style={styles.logo} />
            </Center>
            <KeyboardAvoidingView
                enabled
                style={{
                    flex: 1,
                    backgroundColor: props.keyboardBackgroundColor
                        ? props.keyboardBackgroundColor
                        : colors.backgroundColor,
                }}
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : undefined}
            >
                <TouchableWithoutFeedback
                    disabled={props.disabledCloseKeyboard}
                    onPress={() => Keyboard.dismiss()}>
                    <VStack style={{
                        borderTopRightRadius: screenWidth(40),
                        borderTopLeftRadius: screenWidth(40),
                        backgroundColor: colors.white,
                        ...style.normalShadow,
                        flex: 1,
                        ...props.style,
                    }}>{props.children}</VStack>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            {
                loading && <SpinnerLoading />
            }
        </>
    )
}

export default ParentComponent

const styles = StyleSheet.create({
    button: {
        width: screenWidth(45),
        height: screenWidth(45),
        borderRadius: screenWidth(50) / 2,
        backgroundColor: colors.lowOpacityMain,
        ...style.center
    },
    header: {
        backgroundColor: colors.backgroundColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: screenWidth(20),
        marginBottom: screenWidth(2)
    },
    title: {
        fontSize: size.font22,
        color: colors.black,
    },
    logo: {
        width: screenWidth(80),
        height: screenWidth(80),
    },
})