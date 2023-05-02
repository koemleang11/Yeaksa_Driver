import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextTranslate } from '../custom/Label'
import { style } from '../../styles/style'
import { Box } from 'native-base'
import colors from '../../theme/colors'
import { screenWidth } from '../../theme/layouts'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props {
    onPress: () => void;
}

const AddVariationContainer: React.FC<Props> = (props) => {
    return (
        <>
            <TextTranslate style={style.labelTextInput}>add_variation_optional</TextTranslate>
            <Box style={styles.box}>
                <TouchableOpacity onPress={props.onPress} style={{
                    height: screenWidth(60),
                    borderRadius: screenWidth(60) / 2,
                    backgroundColor: colors.lowOpacityMain,
                    ...style.center
                }}>
                    <AntDesign name='plus' size={screenWidth(36)} color={colors.mainColor} />
                </TouchableOpacity>
            </Box>
        </>
    )
}

export default AddVariationContainer

const styles = StyleSheet.create({
    box: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        padding: screenWidth(20)
    }
})