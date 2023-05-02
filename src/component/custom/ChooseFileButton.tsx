import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HStack } from 'native-base'
import { TextTranslate } from './Label'
import { style } from '../../styles/style'
import { screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { size } from '../../theme/fonts'
import { Battambang } from '../../services/config/fonts'

interface Props {
    label: string;
}

const ChooseFileButton: React.FC<Props> = (props) => {
    return (
        <>
            <TextTranslate style={style.labelTextInput}>{props.label}</TextTranslate>
            <HStack style={styles.buttonContainer}>
                <Text style={styles.textButton}>Choose file</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Browse</Text>
                </TouchableOpacity>
            </HStack>
        </>
    )
}

export default ChooseFileButton

const styles = StyleSheet.create({
    buttonContainer: {
        ...style.row,
        height: screenWidth(55),
        borderRadius: screenWidth(10),
        backgroundColor: colors.white,
        marginBottom: screenWidth(25),
        paddingLeft: screenWidth(25),
        ...style.normalShadow,
    },
    button: {
        backgroundColor: colors.lowOpacityGray,
        borderTopRightRadius: screenWidth(10),
        borderBottomRightRadius: screenWidth(10),
        width: screenWidth(140),
        height: '100%',
        ...style.center
    },
    textButton: {
        color: colors.grayColor,
        fontSize: size.font18,
        ...Battambang
    }
})