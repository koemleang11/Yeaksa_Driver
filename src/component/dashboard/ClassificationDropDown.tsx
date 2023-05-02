import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Box } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { size } from '../../theme/fonts'
import Octicons from 'react-native-vector-icons/Octicons'
import { style } from '../../styles/style'

interface Props {
    value: any;
    data: Array<any>;
    onSelectedChange: any;
}

const ClassificationDropDown: React.FC<Props> = (props) => {

    const [openSelected, setOpenSelected] = useState(false);

    const _renderItem = useCallback(({ item }: any) => {
        return <TouchableOpacity onPress={() => {
            props.onSelectedChange(item);
            setOpenSelected(false);
        }} style={{
            ...styles.item,
            backgroundColor: item?.id == props.value?.id ? colors.lightYellow : colors.white
        }}>
            <Text style={{ ...styles.title, color: colors.black }}>{item?.name}</Text>
            <Octicons
                name={item?.id == props.value?.id ? 'check-circle-fill' : 'circle'}
                size={screenWidth(25)}
                color={colors.yellowColor}
            />
        </TouchableOpacity>
    }, [props.value])

    return (
        <View style={{ width: screenWidth(150), alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => setOpenSelected(!openSelected)} style={styles.button}>
                <Text style={styles.title}>{props.value?.name}</Text>
                <Ionicons name='chevron-down-outline' size={screenWidth(30)} color={colors.mainColor} />
            </TouchableOpacity>
            {
                openSelected && <Box style={styles.box}>
                    <FlatList
                        data={props.data}
                        renderItem={_renderItem}
                    />
                </Box>
            }
        </View>
    )
}

export default React.memo(ClassificationDropDown)

const styles = StyleSheet.create({
    title: {
        color: colors.mainColor,
        fontSize: size.font20,
        marginRight: screenWidth(5)
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: screenWidth(50),
        paddingBottom: screenWidth(2),
        width: screenWidth(200),
    },
    box: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        width: screenWidth(215),
        ...style.shadow,
        overflow: 'hidden',
        position: 'absolute',
        top: screenWidth(45),
        borderWidth: screenWidth(0.3),
        borderColor: colors.lowOpacityGray
    },
    item: {
        flexDirection: 'row',
        paddingVertical: screenWidth(12),
        paddingLeft: screenWidth(15),
        paddingRight: screenWidth(10),
        justifyContent: 'space-between'
    }
})