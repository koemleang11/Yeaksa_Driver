import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BaseComponent from '../../component/BaseComponent'
import { TextTranslate } from '../../component/custom/Label'
import { HStack } from 'native-base'
import { Switch } from 'react-native'
import { style } from '../../styles/style'
import { size } from '../../theme/fonts'
import colors from '../../theme/colors'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import TextInputWithLabel from '../../component/input/TextInputWithLabel'
import SubmitButton from '../../component/custom/SubmitButton'
import { ScrollView } from 'react-native'

const PaymentSettingScreen = () => {

  const [enabledBankPayment, setEnabledBankPayment] = useState(false);
  const [enabledCashPayment, setEnabledCashPayment] = useState(false);

  const [bankName, setBankName] = useState();
  const [bankAccountName, setBankAccountName] = useState();
  const [bankAccountNumber, setBankAccountNumber] = useState();
  const [bankRoutingName, setBankRoutingName] = useState();

  return (
    <BaseComponent title='payment_settings' style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack style={{ ...style.row, ...styles.row, marginTop: screenWidth(25) }}>
          <TextTranslate style={styles.text}>bank_payment</TextTranslate>
          <Switch value={enabledBankPayment} onChange={() => setEnabledBankPayment(!enabledBankPayment)} />
        </HStack>
        <HStack style={style.row}>
          <TextTranslate style={styles.text}>cash_payment</TextTranslate>
          <Switch value={enabledCashPayment} onChange={() => setEnabledCashPayment(!enabledCashPayment)} />
        </HStack>
        <TextInputWithLabel
          label='bank_name'
          placeholder='Sunchhay'
          value={bankName}
          onChangeText={setBankName}
        />
        <TextInputWithLabel
          label='bank_account_name'
          placeholder='Reaksmey Sunchhay'
          value={bankAccountName}
          onChangeText={setBankAccountName}
        />
        <TextInputWithLabel
          label='bank_account_number'
          placeholder='0000-0000-0000-0000'
          value={bankAccountNumber}
          onChangeText={setBankAccountNumber}
        />
        <TextInputWithLabel
          label='bank_routing_number'
          placeholder='0000'
          value={bankRoutingName}
          onChangeText={setBankRoutingName}
        />
        <SubmitButton
          title='save'
          borderRadius={screenWidth(50)}
          marginTop={screenWidth(50)}
        />
      </ScrollView>
    </BaseComponent>
  )
}

export default PaymentSettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding_horizontal
  },
  text: {
    fontSize: size.font18,
    color: colors.grayColor,
    marginLeft: screenWidth(2)
  },
  row: {
    marginBottom: screenWidth(15)
  }
})