import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextTranslate } from './Label'
import { size } from '../../theme/fonts'
import colors from '../../theme/colors'
import { screenWidth } from '../../theme/layouts'
import { Center } from 'native-base'
import { style } from '../../styles/style'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props {
    label: string;
    onPress: () => void;
    image: any;
}

const ShopLogoButton: React.FC<Props> = (props) => {
    return (
        <>
            <TextTranslate style={styles.label}>{props.label}</TextTranslate>
            <TouchableOpacity onPress={props.onPress} style={styles.imageContainer}>
                {
                    props.image ? <Image source={{ uri: props.image }} style={styles.imageContainer} /> : <AntDesign name='plus' size={screenWidth(60)} color={colors.mainColor} />
                }
            </TouchableOpacity>
        </>
    )
}

export default ShopLogoButton

const styles = StyleSheet.create({
    label: {
        fontSize: size.font18,
        color: colors.grayColor,
        marginLeft: screenWidth(3),
        marginBottom: screenWidth(5),
        marginTop: screenWidth(15),
    },
    imageContainer: {
        width: screenWidth(160),
        height: screenWidth(160),
        backgroundColor: colors.lowOpacityMain,
        ...style.center,
        borderRadius: screenWidth(10)
    }
})