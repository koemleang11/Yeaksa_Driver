import React, { useState } from 'react'
import { TextTranslate } from '../../component/custom/Label'
import { KeyboardType, TextInput } from 'react-native'
import colors from '../../theme/colors'
import { style } from '../../styles/style'
import { screenWidth } from '../../theme/layouts'
import { size } from '../../theme/fonts'

interface Props {
    label?: string;
    placeholder: string;
    value: any;
    onChangeText: any;
    keyboardType?: KeyboardType;
    backgroundColor?: any;
    errors?: any;
    onFocus?: any;
}

const TextInputWithLabel: React.FC<Props> = (props) => {
    const [focused, setFocused] = useState(false);
    return (
        <>
            <TextTranslate style={style.labelTextInput}>{props.label}</TextTranslate>
            <TextInput
                value={props.value}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                placeholderTextColor={colors.placeholderColor}
                style={{
                    ...style.textInput,
                    borderWidth: screenWidth(1),
                    borderColor: props.errors ? colors.red : focused ? colors.mainColor : colors.lowOpacityGray,
                    backgroundColor: props.backgroundColor ?? colors.white,
                    ...style.normalShadow,
                }}
                onChangeText={props.onChangeText}
                onEndEditing={() => setFocused(false)}
                onFocus={() => {
                    setFocused(true);
                    props.onFocus && props.onFocus();
                }}
            />
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
};

export default React.memo(TextInputWithLabel);
