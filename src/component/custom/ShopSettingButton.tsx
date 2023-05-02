import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Center, HStack } from 'native-base'
import { screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { style } from '../../styles/style'
import { size } from '../../theme/fonts'
import { TextTranslate } from './Label'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface Props {
    icon: any;
    title: string;
    onPress: () => void;
    size?: any;
}

const ShopSettingButton: React.FC<Props> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
            <HStack alignItems={'center'}>
                <Center style={styles.iconContainer}>
                    <Image source={props.icon} style={{
                        width: props.size ?? screenWidth(26),
                        height: props.size ?? screenWidth(26),
                    }} />
                </Center>
                <TextTranslate style={styles.textButton}>{props.title}</TextTranslate>
            </HStack>
            <Ionicons name='chevron-forward' size={screenWidth(30)} color={colors.white} />
        </TouchableOpacity>
    )
}

export default React.memo(ShopSettingButton)

const styles = StyleSheet.create({
    buttonContainer: {
        width: screenWidth(440),
        height: screenWidth(65),
        borderRadius: screenWidth(10),
        backgroundColor: colors.mainColor,
        ...style.row,
        marginBottom: screenWidth(20),
        paddingHorizontal: screenWidth(15)
    },
    iconContainer: {
        width: screenWidth(45),
        height: screenWidth(45),
        borderRadius: screenWidth(45),
        backgroundColor: 'rgba(116, 118, 204, 0.4)',
        alignSelf: 'center',
        marginRight: screenWidth(12)
    },
    textButton: {
        fontSize: size.font18,
        color: colors.white,
    }
})