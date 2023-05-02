import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { style } from '../../styles/style'
import { size } from '../../theme/fonts'
import { TextTranslate } from './Label'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { makeid } from './FlatListVertical'

interface Props {
    label?: string;
    placeholder: string;
    value: any;
    data: Array<any>;
    onSelectedChange: any;
}

const MultiSelectDropDownList: React.FC<Props> = (props) => {
    const [enabled, setEnabled] = useState(false);
    const [selected, setSelected] = useState<any>([]);

    const onPress = (item: any) => {
        if (selected.includes(item)) {
            const data = selected.filter((value: any) => value !== item);
            setSelected([...data]);
        } else {
            selected.push(item);
            selected.sort((prev: any, curr: any) => prev.id - curr.id);
            setSelected([...selected]);
        }
    };

    const _renderItem = (item: any) => {
        return <TouchableOpacity key={makeid()} onPress={() => {
            onPress(item);
            setEnabled(false);
        }} style={styles.itemContainer}>
            <Text style={styles.textItem}>{item?.title ?? item?.name}</Text>
            <MaterialCommunityIcons
                name={selected.includes(item) ? 'circle-slice-8' : 'circle-outline'}
                color={selected.includes(item) ? colors.mainColor : colors.grayColor}
                size={screenWidth(30)}
            />
        </TouchableOpacity>
    };

    return (
        <>
            {
                props.label ? <TextTranslate style={style.labelTextInput}>{props.label}</TextTranslate>
                    : <Box style={{ height: screenWidth(54) }} />
            }
            <TouchableOpacity onPress={() => setEnabled(!enabled)} style={styles.container}>
                <HStack>
                    {
                        selected.length > 0 ? selected.map((item: any, index: Number) => {
                            return <HStack>
                                <Text style={styles.title}>{item.name}</Text>
                                {
                                    index !== selected.length - 1 &&
                                    <Text style={styles.title}>, </Text>
                                }
                            </HStack>
                        }) : <Text style={styles.title}>{props.placeholder}</Text>
                    }
                </HStack>
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

export default MultiSelectDropDownList

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