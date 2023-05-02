import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { HStack } from 'native-base'
import { TextTranslate } from '../../component/custom/Label'
import { TextInput } from 'react-native'
import { size } from '../../theme/fonts'
import colors from '../../theme/colors'
import { Battambang } from '../../services/config/fonts'
import { screenWidth } from '../../theme/layouts'
import { style } from '../../styles/style'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface Props {
    label: string;
    placeholder: string;
    value: any;
    onChangeText: any;
    errors?: any;
    onFocus?: any;
}

const TextInputPassword: React.FC<Props> = (props) => {
    const [show, setShow] = useState(true);
    const [focused, setFocused] = useState(false);
    const onPress = () => { setShow(!show) }
    return (
        <>
            <TextTranslate style={style.labelTextInput}>{props.label}</TextTranslate>
            <HStack style={{
                ...styles.textInputContainer,
                borderWidth: screenWidth(1),
                borderColor: props.errors ? colors.red : focused ? colors.mainColor : colors.lowOpacityGray
            }}>
                <TextInput
                    value={props.value}
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.placeholderColor}
                    style={styles.textInput}
                    onChangeText={props.onChangeText}
                    secureTextEntry={show}
                    onEndEditing={() => setFocused(false)}
                    onFocus={() => {
                        setFocused(true);
                        props.onFocus && props.onFocus();
                    }}
                />
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Ionicons name={show ? 'eye-off' : 'eye'} size={screenWidth(26)} color={colors.grayColor} />
                </TouchableOpacity>
            </HStack>
            {props.errors && (
                <TextTranslate style={{
                    color: colors.red,
                    fontSize: size.font14,
                    marginLeft: screenWidth(5),
                    marginTop: screenWidth(5)
                }}>
                    {props.errors}
                </TextTranslate>
            )}
        </>
    )
}

export default React.memo(TextInputPassword);

const styles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        ...style.normalShadow,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: screenWidth(10),
        marginTop: screenWidth(5)
    },
    textInput: {
        flex: 1,
        fontSize: size.font18,
        color: colors.black,
        ...Battambang,
        height: screenWidth(60),
        paddingLeft: screenWidth(25),
    },
    button: {
        padding: screenWidth(10)
    }
})