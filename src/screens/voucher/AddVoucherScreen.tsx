import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BaseComponent from '../../component/BaseComponent'
import DropDownList from '../../component/custom/DropDownList'
import colors from '../../theme/colors'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import { style } from '../../styles/style'
import SubmitButton from '../../component/custom/SubmitButton'
import { HStack } from 'native-base'
import { goBack } from '../../services/navigate/navigation'
import TextInputWithLabel from '../../component/input/TextInputWithLabel'
import CustomDateTimePicker from '../../component/custom/CustomDateTimePicker'
import { add } from 'date-fns'
import CustomProductModal from '../../component/modal/CustomProductModal'

const couponType = [
    {
        id: 1,
        title: 'For Product'
    },
    {
        id: 2,
        title: 'Total Order'
    },
    {
        id: 3,
        title: 'Delivery Voucher'
    },
]

const discountList = [
    {
        id: 1,
        title: 'Limited'
    },
    {
        id: 2,
        title: 'Unlimited'
    },
]
const totalTypeList = [
    {
        id: 1,
        title: 'Amount'
    },
    {
        id: 2,
        title: 'Percent'
    },
]

const AddVoucherScreen = () => {
    const [openStartDate, setOpenStartDate] = useState(false);
    const [openDueDate, setOpenDueDate] = useState(false);
    const [state, setState] = useState<any>({
        voucherType: {},
        voucherCode: '',
        discount: '',
        discountType: discountList[0],
        startDate: new Date(),
        dueDate: new Date(),
        total: '',
        totalType: totalTypeList[0],
    })
    const handleStateChange = (name: string, value: any) => {
        state[name] = value;
        setState({ ...state });
    }
    const handleConfirmStartDate = (value: any) => {
        setOpenStartDate(false);
        handleStateChange('startDate', value)
        value > state.dueDate && handleStateChange('dueDate', add(value, { days: 1 }))
    }
    const handleConfirmDueDate = (value: any) => {
        setOpenDueDate(false);
        handleStateChange('dueDate', value);
        value < state.startDate && handleStateChange('startDate', add(value, { days: -1 }));
    }
    return (
        <>
            <BaseComponent title='add_new_vouchers' style={{ flex: 1, paddingHorizontal: padding_horizontal }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={null}
                    renderItem={() => <></>}
                    ListHeaderComponentStyle={{ paddingBottom: screenWidth(20) }}
                    ListHeaderComponent={
                        <>
                            <DropDownList
                                label='voucher_type'
                                placeholder='Select'
                                data={couponType}
                                value={state.voucherType}
                                onSelectedChange={(value: any) => handleStateChange('voucherType', value)}
                            />
                            <TextInputWithLabel
                                label='voucher_code'
                                placeholder='#PHSARTECH'
                                value={state.voucherCode}
                                onChangeText={(value: any) => handleStateChange('voucherCode', value)}
                            />
                            <HStack justifyContent={'space-between'}>
                                <View style={{ width: '60%' }}>
                                    <TextInputWithLabel
                                        label='seller_to_be_issue'
                                        placeholder='0'
                                        value={state.voucherCode}
                                        onChangeText={(value: any) => handleStateChange('voucherCode', value)}
                                    />
                                </View>
                                <View style={{ width: '37%' }}>
                                    <DropDownList
                                        placeholder='Select'
                                        data={discountList}
                                        value={state.discountType}
                                        onSelectedChange={(value: any) => handleStateChange('discountType', value)}
                                    />
                                </View>
                            </HStack>
                            <CustomProductModal />
                            <CustomDateTimePicker
                                minimumDate={new Date()}
                                label='start_date_time'
                                isOpen={openStartDate}
                                date={state.startDate}
                                onPress={() => setOpenStartDate(true)}
                                onCancel={() => setOpenStartDate(false)}
                                onConfirm={handleConfirmStartDate}
                            />
                            <CustomDateTimePicker
                                minimumDate={add(new Date(), { days: 1 })}
                                label='due_date_time'
                                isOpen={openDueDate}
                                date={state.dueDate}
                                onPress={() => setOpenDueDate(true)}
                                onCancel={() => setOpenDueDate(false)}
                                onConfirm={handleConfirmDueDate}
                            />
                            <HStack justifyContent={'space-between'}>
                                <View style={{ width: '60%' }}>
                                    <TextInputWithLabel
                                        label='total_order'
                                        placeholder='0'
                                        value={state.total}
                                        onChangeText={(value: any) => handleStateChange('total', value)}
                                    />
                                </View>
                                <View style={{ width: '37%' }}>
                                    <DropDownList
                                        placeholder='Select'
                                        data={totalTypeList}
                                        value={state.totalType}
                                        onSelectedChange={(value: any) => handleStateChange('totalType', value)}
                                    />
                                </View>
                            </HStack>
                        </>
                    }
                />
            </BaseComponent>
            <HStack style={styles.boxContainer}>
                <SubmitButton
                    onPress={goBack}
                    title='save'
                    width={'100%'}
                    borderRadius={screenWidth(50)}
                />
            </HStack>
            <SafeAreaView style={{ backgroundColor: colors.white }} />
        </>
    )
}

export default AddVoucherScreen

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: colors.white,
        paddingVertical: screenWidth(15),
        paddingHorizontal: screenWidth(20),
        justifyContent: 'space-between',
        borderTopLeftRadius: screenWidth(20),
        borderTopRightRadius: screenWidth(20),
        ...style.normalShadow
    },
})