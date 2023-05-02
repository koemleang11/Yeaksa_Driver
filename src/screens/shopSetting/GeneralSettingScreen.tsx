import { StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useState } from 'react'
import BaseComponent from '../../component/BaseComponent'
import TextInputWithLabel from '../../component/input/TextInputWithLabel'
import { padding_horizontal } from '../../theme/layouts'
import ShopLogoButton from '../../component/custom/ShopLogoButton'
import ImagePicker from 'react-native-image-crop-picker';
import { useAppSelector } from '../../hooks/dispatch'

const GeneralSettingScreen = () => {

  const [shopName, setShopName] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopLogo, setShopLogo] = useState<any>();

  const onPress = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      setShopLogo(image)
      console.log(image.path);
    });
  }

  return (
    <BaseComponent title='general_setting' style={{ paddingHorizontal: padding_horizontal }}>
      <TextInputWithLabel
        label='shop_name'
        placeholder='Enter shop name'
        value={shopName}
        onChangeText={setShopName}
      />
      <TextInputWithLabel
        label='shop_phone'
        placeholder='Enter shop phone'
        value={shopPhone}
        onChangeText={setShopPhone}
      />
      <ShopLogoButton
        label={'shop_logo'}
        image={shopLogo?.path}
        onPress={onPress}
      />
    </BaseComponent>
  )
}

export default GeneralSettingScreen

const styles = StyleSheet.create({})