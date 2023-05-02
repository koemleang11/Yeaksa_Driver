import { SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { screenWidth } from '../../theme/layouts'
import { ScrollView } from 'react-native'
import { Box, HStack } from 'native-base'
import BaseComponent from '../../component/BaseComponent'
import CustomerInformation from '../../component/orderDetail/CustomerInformation'
import OrderItem from '../../component/orderDetail/OrderItem'
import OrderSummary from '../../component/orderDetail/OrderSummary'
import SubmitButton from '../../component/custom/SubmitButton'
import colors from '../../theme/colors'
import { style } from '../../styles/style'
import CustomModal from '../../component/modal/CustomModal'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomRejectModal from '../../component/modal/CustomRejectModal'

const statusList = {
    Pending: 'Pending',
    Confirm: 'Confirm',
    Preparing: 'Preparing',
    Ready: 'Ready'
}

const OrderDetailScreen = () => {
    const [openReject, setOpenReject] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [status, setStatus] = useState();
    const handleConfirm = () => {
        setOpenConfirm(false);
    }
    const handleReject = () => {
        setOpenReject(false);
    }

    return (
        <>
            <BaseComponent title='order_detail' style={{ flex: 1 }} disabledCloseKeyboard>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomerInformation />
                    <OrderItem />
                    <OrderSummary />
                    <Box style={{ height: screenWidth(30) }} />
                </ScrollView>
            </BaseComponent>
            <HStack style={styles.boxContainer}>
                <SubmitButton
                    onPress={() => { setOpenReject(true); }}
                    title='reject'
                    width={'30%'}
                    borderRadius={screenWidth(50)}
                    backgroundColor={colors.white}
                    borderColor={colors.red}
                    borderWidth={screenWidth(2)}
                    color={colors.red}
                />
                <SubmitButton
                    onPress={() => { setOpenConfirm(true); }}
                    title='confirm'
                    width={'66%'}
                    borderRadius={screenWidth(50)}
                />
            </HStack>
            <CustomModal
                isOpen={openConfirm}
                onClose={() => setOpenConfirm(false)}
                title='are_you_sure'
                subTitle='you_want_to_confirm_this_order'
                firstButton='no'
                secondButton='yes'
                icon={<FontAwesome name='question' color={colors.white} size={screenWidth(44)} />}
                firstButtonPress={() => setOpenConfirm(false)}
                secondButtonPress={handleConfirm}
            />
            <CustomRejectModal
                isOpen={openReject}
                onClose={() => setOpenReject(false)}
                title='are_you_sure'
                subTitle='you_want_to_reject_this_order'
                firstButton='cancel'
                secondButton='confirm'
                icon={<FontAwesome name='question' color={colors.white} size={screenWidth(44)} />}
                firstButtonPress={() => setOpenReject(false)}
                secondButtonPress={handleReject}
            />
            <SafeAreaView style={{ backgroundColor: colors.white }} />
        </>
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: colors.white,
        paddingVertical: screenWidth(15),
        paddingHorizontal: screenWidth(20),
        justifyContent: 'space-between',
        borderTopLeftRadius: screenWidth(20),
        borderTopRightRadius: screenWidth(20),
        ...style.normalShadow
    }
})