import React from 'react'
import { TextTranslate } from '../../component/custom/Label'
import { StyleSheet, TextInput } from 'react-native'
import colors from '../../theme/colors'
import { style } from '../../styles/style'
import { screenWidth } from '../../theme/layouts'
import { Box } from 'native-base'
import { size } from '../../theme/fonts'
import { Battambang } from '../../services/config/fonts'

interface Props {
    label: string;
    placeholder: string;
    value: any;
    onChangeText: any;
}

const TextInputDescription: React.FC<Props> = (props) => {
    return (
        <>
            <TextTranslate style={style.labelTextInput}>{props.label}</TextTranslate>
            <Box style={styles.textContainer}>
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.placeholderColor}
                    style={styles.textInput}
                    onChangeText={props.onChangeText}
                    multiline
                />
            </Box>
        </>
    )
}

export default React.memo(TextInputDescription);

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: colors.white,
        paddingVertical: screenWidth(5),
        borderRadius: screenWidth(10),
        ...style.normalShadow,
    },
    textInput: {
        textAlignVertical: 'top',
        minWidth: screenWidth(120),
        fontSize: size.font18,
        color: colors.black,
        ...Battambang,
        backgroundColor: colors.white,
        paddingHorizontal: screenWidth(25),
        borderRadius: screenWidth(10),
        height: screenWidth(150)
    }
})