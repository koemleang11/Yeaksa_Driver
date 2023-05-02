import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { HStack } from 'native-base'
import { style } from '../../styles/style'
import { size } from '../../theme/fonts'
import { Battambang } from '../../services/config/fonts'
import colors from '../../theme/colors'
import { padding_horizontal, screenWidth } from '../../theme/layouts'

interface Props {
    label: string;
    backgroundColor?: any;
    value: any;
    onValueChange: any;
}

const CustomSwitchButton: React.FC<Props> = (props) => {
    return (
        <HStack style={{ ...styles.row, backgroundColor: props.backgroundColor ?? 'transparent' }}>
            <Text style={styles.text}>{props.label}</Text>
            <Switch value={props.value} onValueChange={props.onValueChange}/>
        </HStack>
    )
}

export default CustomSwitchButton

const styles = StyleSheet.create({
    row: {
        ...style.row,
        height: screenWidth(60),
        paddingHorizontal: padding_horizontal + screenWidth(5),
        marginTop: screenWidth(5)
    },
    text: {
        fontSize: size.font18,
        ...Battambang,
        color: colors.grayColor
    }
})