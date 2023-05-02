import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { style } from '../../styles/style'
import { size } from '../../theme/fonts'
import { TextTranslate } from './Label'
import { useAppSelector } from '../../hooks/dispatch'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { makeid } from './FlatListVertical'

interface Props {
    label?: string;
    placeholder: string;
    value: any;
    data: Array<any>;
    onSelectedChange: any;
}

const DropDownList: React.FC<Props> = (props) => {
    const [enabled, setEnabled] = useState(false);
    const _renderItem = (item: any) => {
        return <TouchableOpacity key={makeid()} onPress={() => {
            props.onSelectedChange(item);
            setEnabled(false);
        }} style={styles.itemContainer}>
            <Text style={styles.textItem}>{item?.title ?? item?.name}</Text>
            <MaterialCommunityIcons
                name={item?.id === props.value?.id ? 'circle-slice-8' : 'circle-outline'}
                color={item?.id === props.value?.id ? colors.mainColor : colors.grayColor}
                size={screenWidth(30)}
            />
        </TouchableOpacity>
    }
    return (
        <>
            {
                props.label ? <TextTranslate style={style.labelTextInput}>{props.label}</TextTranslate>
                    : <Box style={{ height: screenWidth(54) }} />
            }
            <TouchableOpacity onPress={() => setEnabled(!enabled)} style={styles.container}>
                <Text style={styles.title}>{props.value?.title ?? props.value?.name ?? props.placeholder}</Text>
                <Ionicons name='chevron-down-outline' size={screenWidth(25)} color={colors.grayColor} />
            </TouchableOpacity>
            {
                enabled && <Box style={styles.dropDownBox}>
                    <ScrollView
                        nestedScrollEnabled
                        scrollEnabled
                    >
                        {
                            props.data.map(_renderItem)
                        }
                    </ScrollView>
                </Box>
            }
        </>
    )
}

export default DropDownList

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: screenWidth(55),
        borderRadius: screenWidth(10),
        marginBottom: screenWidth(5),
        paddingLeft: screenWidth(20),
        paddingRight: screenWidth(15),
        borderColor: colors.lowOpacityGray,
        borderWidth: screenWidth(0.3),
        ...style.row,
        ...style.normalShadow,
    },
    title: {
        fontSize: size.font18,
        color: colors.black,
    },
    textItem: {
        fontSize: size.font18,
        color: colors.black
    },
    itemContainer: {
        ...style.row,
        height: screenWidth(60),
        paddingLeft: screenWidth(20),
        paddingRight: screenWidth(15)
    },
    dropDownBox: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        marginTop: screenWidth(5),
        ...style.normalShadow,
        maxHeight: screenWidth(240)
    }
})