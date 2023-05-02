import {
    StyleSheet,
    Text,
    Keyboard
} from 'react-native'
import React, { useState } from 'react'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import colors from '../../theme/colors';
import { size } from '../../theme/fonts';
import { screenWidth } from '../../theme/layouts';
import { style } from '../../styles/style';

const CELL_COUNT = 6;

const DigitCodeInput = (prop: any) => {

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [getCell, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <CodeField
            ref={ref}
            value={prop.value}
            onChangeText={prop.onChangeText}
            cellCount={CELL_COUNT}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            onSubmitEditing={Keyboard.dismiss}
            renderCell={({ index, symbol, isFocused }) => (
                <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
            )}
        />
    )
}

export default DigitCodeInput

const styles = StyleSheet.create({
    cell: {
        ...style.poppinsMedium,
        width: screenWidth(50),
        height: screenWidth(50),
        lineHeight:screenWidth(50),
        fontSize: size.font24,
        color: colors.black,
        textAlign: 'center',
        backgroundColor: colors.lowOpacityGray,
        marginHorizontal: screenWidth(10),
        marginTop: screenWidth(10),
        marginBottom: screenWidth(20),
        borderRadius: screenWidth(10),
        overflow: 'hidden'
    },
    focusCell: {
        borderColor: 'transparent',
    },
})
