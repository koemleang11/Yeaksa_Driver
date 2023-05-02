import { Text } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/dispatch'
import { size } from '../../theme/fonts'
import { FormatLang, FormatLangBold, FormatLangMedium } from '../../services/utils/lang'
import { screenWidth } from '../../theme/layouts'

export const TextTranslate = (props: any) => {
    const language = useAppSelector((state: any) => state.lang);
    return (
        <Text {...props} style={[props.style, {
            ...FormatLangMedium[language.lang],
            // fontSize: language.lang == 'en' ? size.font18 : size.font16
        }]}>
            {language[props.children]}
        </Text>
    )
}

export const TextTranslateBold = (props: any) => {
    const language = useAppSelector((state: any) => state.lang);
    return (
        <Text {...props} style={[props.style, {
            ...FormatLangBold[language.lang],
            // fontSize: language.lang == 'en' ? size.font20 : size.font18
        }]}>
            {language[props.children]}
        </Text>
    )
}

export const LabelButtonTab = (props: any) => {
    const language = useAppSelector((state: any) => state.lang);
    return (
        <Text {...props} style={[props.style, {
            ...FormatLang[language.lang],
            fontSize: size.font14
        }]}>
            {language[props.children]}
        </Text>
    )
}