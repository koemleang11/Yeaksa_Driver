import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextTranslate } from './Label'
import { style } from '../../styles/style'
import { HStack } from 'native-base'
import colors from '../../theme/colors'
import { screenWidth } from '../../theme/layouts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { size } from '../../theme/fonts'
import DatePicker from 'react-native-date-picker'
import NormalDate from '../../services/utils'
import { useAppSelector } from '../../hooks/dispatch'
import moment from 'moment'

interface Props {
    label: string;
    isOpen: boolean;
    date: any;
    minimumDate?: any;
    onConfirm: (value: any) => void;
    onCancel: () => void;
    onPress: () => void;
}

const CustomDateTimePicker: React.FC<Props> = (props) => {
    const lang: any = useAppSelector(state => state.lang);
    return (
        <View style={{ width: '100%' }}>
            <TextTranslate style={style.labelTextInput}>{props.label}</TextTranslate>
            <TouchableOpacity onPress={props.onPress} style={styles.row}>
                <Text style={styles.date}>{moment(props.date).format('DD/MMM/YYYY HH:mm A')}</Text>
                <Ionicons name='calendar-outline' color={colors.grayColor} size={screenWidth(30)} />
            </TouchableOpacity>
            <DatePicker
                modal
                locale={lang?.lang === 'en' ? 'en' : 'km'}
                minimumDate={props.minimumDate}
                title={lang['select_date']}
                open={props.isOpen}
                date={props.date}
                onConfirm={props.onConfirm}
                onCancel={props.onCancel}
            />
        </View>
    )
}

export default CustomDateTimePicker

const styles = StyleSheet.create({
    row: {
        ...style.row,
        ...style.normalShadow,
        paddingHorizontal: screenWidth(15),
        height: screenWidth(55),
        borderRadius: screenWidth(10),
        backgroundColor: colors.white
    },
    date: {
        fontSize: size.font18,
        color: colors.black,
        marginLeft: screenWidth(8)
    }
})