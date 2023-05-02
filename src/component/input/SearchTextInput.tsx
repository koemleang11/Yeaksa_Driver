import { StyleSheet, Text, TouchableOpacity, Animated } from 'react-native'
import React, { createRef, useState } from 'react'
import { HStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { metrics, padding_horizontal, screenWidth } from '../../theme/layouts';
import colors from '../../theme/colors';
import { Battambang } from '../../services/config/fonts';
import { size } from '../../theme/fonts';
import { style } from '../../styles/style';
import { TextInput } from 'react-native';
import { useAppSelector } from '../../hooks/dispatch';

interface Props {
    placeholder: string;
    onClose: () => void;
    value: any;
    onChangeText: (value: any) => void;
}

const SearchTextInput: React.FC<Props> = (props) => {

    const lang: any = useAppSelector(state => state.lang);

    return (
        <HStack style={styles.textInputContainer}>
            <Ionicons name='search' size={screenWidth(30)} color={colors.mainColor} />
            <TextInput
                placeholder={lang[props.placeholder]}
                placeholderTextColor={colors.placeholderColor}
                style={styles.textInput}
                autoCorrect={false}
                value={props.value}
                onChangeText={props.onChangeText}
            />
            {
                String(props.value).trim().length > 0 ? <TouchableOpacity
                    onPress={props.onClose}
                    style={styles.menuButton}
                    activeOpacity={0.8}
                >
                    <Ionicons name='ios-close-circle' size={screenWidth(30)} color={colors.lightGrayColor} />
                </TouchableOpacity> : <HStack style={{ width: screenWidth(40) }} />
            }
        </HStack>
    )
}

export default React.memo(SearchTextInput)

const styles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: colors.white,
        height: screenWidth(55),
        borderRadius: screenWidth(50) / 2,
        width: screenWidth(440),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: screenWidth(15),
        paddingRight: screenWidth(5),
        ...style.normalShadow,
        marginVertical: screenWidth(15),
        marginTop: screenWidth(13),
    },
    textInput: {
        color: colors.black,
        fontSize: size.font18,
        ...Battambang,
        paddingHorizontal: screenWidth(10),
        width: screenWidth(340),
        paddingVertical: screenWidth(5),
        textAlignVertical: 'center',
    },
    menuButton: {
        padding: screenWidth(5),
    },
})