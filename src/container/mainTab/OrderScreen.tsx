import { FlatList, StyleSheet, SafeAreaView } from 'react-native'
import React, { useCallback, useState } from 'react'
import BaseComponent from '../../component/BaseComponent'
import PaymentStatusDropDown from '../../component/order/PaymentStatusDropDown'
import DeliveryStatusDropDown from '../../component/order/DeliveryStatusDropDown'
import { HStack } from 'native-base'
import { padding_horizontal } from '../../theme/layouts'
import CardItem from '../../component/order/CardItem'
import colors from '../../theme/colors'

const paymentStatusList = [
  {
    id: 1,
    title: 'All'
  },
  {
    id: 2,
    title: 'Paid'
  },
  {
    id: 3,
    title: 'Unpaid'
  },
]

const deliveryStatusList = [
  {
    id: 1,
    title: 'All'
  },
  {
    id: 2,
    title: 'Pending'
  },
  {
    id: 3,
    title: 'Confirmed'
  },
  {
    id: 4,
    title: 'Preparing'
  },
  {
    id: 5,
    title: 'Ready'
  },
  {
    id: 6,
    title: 'Pick Up'
  },
  {
    id: 7,
    title: 'On The Way'
  },
  {
    id: 8,
    title: 'Delivered'
  },
  {
    id: 9,
    title: 'Rejected'
  },
]

const OrderScreen = () => {

  const [paymentStatus, setPaymentStatus] = useState(paymentStatusList[0]);
  const [deliveryStatus, setDeliveryStatus] = useState(paymentStatusList[0]);
  const _renderItem = () => {
    return <CardItem />
  };

  return (
    <>
      <BaseComponent title='orders' style={{ paddingHorizontal: padding_horizontal, flex: 1 }}>
        <HStack justifyContent={'space-between'} zIndex={100}>
          <PaymentStatusDropDown
            placeholder='Select'
            data={paymentStatusList}
            value={paymentStatus}
            onSelectedChange={setPaymentStatus}
          />
          <DeliveryStatusDropDown
            placeholder='Select'
            data={deliveryStatusList}
            value={deliveryStatus}
            onSelectedChange={setDeliveryStatus}
          />
        </HStack>
        <FlatList
          data={[1, 2, 3]}
          renderItem={_renderItem}
        />
      </BaseComponent>
      <SafeAreaView style={{ backgroundColor: colors.mainColor }} />
    </>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})