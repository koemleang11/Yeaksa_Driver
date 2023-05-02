import { StyleSheet, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { HStack, useDisclose, VStack } from 'native-base';
import BlurBackground from './BlurBackground';
import colors from '../../theme/colors';
import { metrics, screenWidth } from '../../theme/layouts';
import CustomDatePicker from './CustomDatePicker';
import SubmitButton from './SubmitButton';
import { style } from '../../styles/style';
import { size } from '../../theme/fonts';
import { add } from 'date-fns';
import { TextTranslate } from './Label';
import { View } from 'react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Battambang } from '../../services/config/fonts';

interface Props {
    onConfirm: (value: any) => void;
}

const FromDatePicker: React.FC<Props> = (props) => {
    const { isOpen, onClose, onOpen } = useDisclose();
    const [state, setState] = useState<any>({
        openFromDate: false,
        openToDate: false,
        fromDate: new Date(),
        toDate: add(new Date(), { days: 1 })
    });
    const handleStateChange = (name: string, value: any) => {
        state[name] = value;
        setState({ ...state });
    }
    const onConfirmFromDate = (value: any) => {
        handleStateChange('fromDate', value);
        handleStateChange('openFromDate', false);
        if (value > state.toDate) {
            handleStateChange('toDate', add(value, { days: 1 }));
        }
    }
    const onConfirmToDate = (value: any) => {
        handleStateChange('toDate', value);
        handleStateChange('openToDate', false);
        if (value < state.fromDate) {
            handleStateChange('fromDate', add(value, { days: -1 }));
        }
    }
    const handleConfirm = () => {
        onClose();
        props.onConfirm(state);
    }
    return (
        <View style={{ flex: 1, marginLeft: screenWidth(15) }}>
            <TextTranslate style={style.labelTextInput}>date</TextTranslate>
            <TouchableOpacity onPress={onOpen} style={styles.button}>
                <Text style={styles.text}>{moment(state.fromDate).format('DD/MM/YYYY')} - {moment(state.toDate).format('DD/MM/YYYY')}</Text>
                <Ionicons name='chevron-down-outline' size={screenWidth(25)} color={colors.grayColor} />
            </TouchableOpacity>
            <Modal visible={isOpen} transparent statusBarTranslucent>
                <BlurBackground onPress={onClose} />
                <VStack style={styles.container}>
                    <HStack style={styles.dateContainer}>
                        <CustomDatePicker
                            minimumDate={new Date()}
                            label='from'
                            date={state.fromDate}
                            isOpen={state.openFromDate}
                            onPress={() => handleStateChange('openFromDate', true)}
                            onConfirm={onConfirmFromDate}
                            onCancel={() => handleStateChange('openFromDate', false)}
                        />
                        <CustomDatePicker
                            minimumDate={add(new Date(), { days: 1 })}
                            label='to'
                            date={state.toDate}
                            isOpen={state.openToDate}
                            onPress={() => handleStateChange('openToDate', true)}
                            onConfirm={onConfirmToDate}
                            onCancel={() => handleStateChange('openToDate', false)}
                        />
                    </HStack>
                    <HStack style={style.row}>
                        <SubmitButton
                            onPress={onClose}
                            title='cancel'
                            width={'48%'}
                            backgroundColor={colors.white}
                            borderColor={colors.red}
                            borderWidth={screenWidth(1.5)}
                            color={colors.red}
                            height={screenWidth(45)}
                            fontSize={size.font18}
                        />
                        <SubmitButton
                            onPress={handleConfirm}
                            title='apply'
                            width={'48%'}
                            height={screenWidth(45)}
                            fontSize={size.font18}
                        />
                    </HStack>
                </VStack>
            </Modal>
        </View>
    )
}

export default FromDatePicker

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        paddingVertical: screenWidth(15),
        paddingBottom: screenWidth(30),
        paddingHorizontal: screenWidth(25),
        marginHorizontal: screenWidth(20),
        marginTop: metrics.screenHeight / 2 - screenWidth(160),
        justifyContent: 'space-between',
    },
    button: {
        ...style.row,
        paddingRight: screenWidth(15),
        paddingLeft: screenWidth(20),
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        height: screenWidth(55),
        ...style.normalShadow
    },
    dateContainer: {
        justifyContent: 'space-between',
        borderBottomColor: colors.lowOpacityGray,
        borderBottomWidth: screenWidth(2),
        paddingBottom: screenWidth(30),
        marginBottom: screenWidth(30)
    },
    text: {
        fontSize: size.font18,
        color: colors.black,
        ...Battambang
    }
})