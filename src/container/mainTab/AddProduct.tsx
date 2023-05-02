import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import BaseComponent from '../../component/BaseComponent'
import DropDownList from '../../component/custom/DropDownList'
import { padding_horizontal, screenWidth } from '../../theme/layouts';
import { FlatList } from 'react-native';
import TextInputWithLabel from '../../component/input/TextInputWithLabel';
import ShopLogoButton from '../../component/custom/ShopLogoButton';
import ImagePicker from 'react-native-image-crop-picker';
import { HStack, useToast } from 'native-base';
import FromDatePicker from '../../component/custom/FromDatePicker';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';
import TextInputDescription from '../../component/input/TextInputDescription';
import ChooseFileButton from '../../component/custom/ChooseFileButton';
import CustomSwitchButton from '../../component/custom/CustomSwitchButton';
import colors from '../../theme/colors';
import SubmitButton from '../../component/custom/SubmitButton';
import { style } from '../../styles/style';
import { Text } from 'react-native';
import { size } from '../../theme/fonts';
import { Battambang } from '../../services/config/fonts';
import AddVariationContainer from '../../component/addProduct/AddVariationContainer';
import { navigate } from '../../services/navigate/navigation';
import { Routes } from '../../temp/Routes';
import { baseUrl, shortBaseUrl } from '../../services/api/index.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MessageType, showToast } from '../../component/custom/Toast';
import { loadLoading } from '../../redux/actions';
import SpinnerLoading from '../../component/loading/SpinnerLoading';

const discountList = [
  {
    id: 1,
    title: 'Amount'
  },
  {
    id: 2,
    title: 'Percent'
  },
];

interface Props {
  data: PropsInterface
}

interface PropsInterface {
  type: any;
  classification: any;
  brandName: any;
  productName: any;
  thumbnail: any;
  productPrice: any;
  qtyInStock: any;
  discountType: any;
  discountAmount: any;
  expireDate: any;
  warningQty: any;
  buyMinQty: any;
  description: any;
  isSEOMeta: boolean;
  isFreeDelivery: boolean;
  isShowStock: boolean;
  metaKeyWord: any;
  handleStateChange: (state: string, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

const AddProduct: React.FC<Props> = ({ data }) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const lang: any = useAppSelector(state => state.lang);
  const loading: any = useAppSelector(state => state.loading);
  const classificationState = useAppSelector(state => state.classification.data);

  async function PostUpdate(end_point: any, form_data: any) {
    let token = await AsyncStorage.getItem('@token');
    var myHeader = new Headers();
    myHeader.append('Cache-Control', 'no-cache');
    myHeader.append('Accept', 'application/json');
    myHeader.append('Authorization', `Bearer ${token}`);
    return new Promise(async (resolve, reject) => {
      try {
        await fetch(`${shortBaseUrl}${end_point}`, {
          method: 'POST',
          headers: myHeader,
          body: form_data,
        })
          .then(res => res.json())
          .then((result: any) => {
            resolve(result);
            if (result.message) {
              data.handleStateChange('thumbnail', { id: data?.thumbnail?.id, photo: result.data });
              showToast(toast, 'uploaded', MessageType.success)
            } else {
              showToast(toast, 'try_again', MessageType.error)
            }
            dispatch(loadLoading(false));
          });
      } catch (error) {
        console.log(`Request URL : ${baseUrl}${end_point}`);
        reject(error);
        showToast(toast, 'try_again', MessageType.error)
        dispatch(loadLoading(false));
      }
    });
  }
  
  const onPress = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      if (image) {
        const formdata = new FormData();
        formdata.append('image', {
          type: image.mime,
          name: image.filename ?? image.modificationDate,
          uri: image.path
        });
        dispatch(loadLoading(true));
        PostUpdate('upload-image', formdata);
      }
    });
  }

  return (
    <>
      <BaseComponent
        title={data.type}
        style={{ flex: 1 }}
        disabledCloseKeyboard
        disabledLoading
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          data={null}
          renderItem={() => <></>}
          ListHeaderComponentStyle={{ paddingBottom: screenWidth(50) }}
          ListHeaderComponent={
            <>
              <View style={{ paddingHorizontal: padding_horizontal }}>
                <DropDownList
                  label='categories'
                  placeholder={lang['please_select_category']}
                  data={classificationState}
                  value={data.classification}
                  onSelectedChange={(value: any) => data.handleStateChange('classification', value)}
                />
                <TextInputWithLabel
                  label='brand_optional'
                  placeholder='Adidas'
                  value={data.brandName}
                  onChangeText={(value: any) => data.handleStateChange('brandName', value)}
                />
                <TextInputWithLabel
                  label='product_name'
                  placeholder='Jordan'
                  value={data.productName}
                  onChangeText={(value: any) => data.handleStateChange('productName', value)}
                />
                <ShopLogoButton
                  label={'thumbnail_image'}
                  image={data?.thumbnail?.photo}
                  onPress={onPress}
                />
                <TextInputWithLabel
                  label='product_price'
                  placeholder='$0.00'
                  value={data?.productPrice?.toString()}
                  onChangeText={(value: any) => data.handleStateChange('productPrice', value)}
                />
                <DropDownList
                  label='discount_optional'
                  placeholder={lang['select']}
                  data={discountList}
                  value={data.discountType}
                  onSelectedChange={(value: any) => data.handleStateChange('discountType', value)}
                />
                <HStack>
                  <View>
                    <TextInputWithLabel
                      label='amount'
                      placeholder='0'
                      value={data?.discountAmount?.toString()}
                      onChangeText={(value: any) => data.handleStateChange('discountAmount', value)}
                    />
                  </View>
                  <FromDatePicker
                    onConfirm={(value: any) => { }}
                  />
                </HStack>
                <Text style={{
                  fontSize: size.font16,
                  marginTop: screenWidth(15),
                  marginLeft: screenWidth(3),
                  ...Battambang
                }}>Your product price have been reset from <Text style={{ textDecorationLine: 'line-through' }}>$100.00</Text> to <Text style={{ color: colors.green }}>$80.00</Text></Text>
                <AddVariationContainer
                  onPress={() => navigate(Routes.AddVariation)}
                />
                <TextInputWithLabel
                  label='qty_in_stock'
                  placeholder='0'
                  value={data?.qtyInStock?.toString()}
                  onChangeText={(value: any) => data.handleStateChange('qtyInStock', value)}
                />
                <TextInputWithLabel
                  label='warning_qty'
                  placeholder='0'
                  value={data.warningQty}
                  onChangeText={(value: any) => data.handleStateChange('warningQty', value)}
                />
                <TextInputWithLabel
                  label='buy_minimum_quality'
                  placeholder='0'
                  value={data.buyMinQty}
                  onChangeText={(value: any) => data.handleStateChange('buyMinQty', value)}
                />
                <TextInputDescription
                  label={'add_description_optional'}
                  placeholder={'Text message...'}
                  value={data.description}
                  onChangeText={(value: any) => data.handleStateChange('description', value)}
                />
                <ChooseFileButton label='pdf_specification_optional' />
              </View>
              <CustomSwitchButton
                backgroundColor={colors.lowOpacityMain}
                label='SEO Meta Tags'
                value={data.isSEOMeta}
                onValueChange={(value: any) => data.handleStateChange('isSEOMeta', value)}
              />
              <View style={{ paddingHorizontal: padding_horizontal, marginBottom: screenWidth(15) }}>
                {
                  data.isSEOMeta && <TextInputWithLabel
                    label='buy_minimum_quality'
                    placeholder='0'
                    value={data.metaKeyWord}
                    onChangeText={(value: any) => data.handleStateChange('metaKeyWord', value)}
                  />
                }
              </View>
              <CustomSwitchButton
                label='Free Shipping'
                value={data.isFreeDelivery}
                onValueChange={(value: any) => data.handleStateChange('isFreeDelivery', value)}
              />
              <CustomSwitchButton
                label='Show Stock'
                value={data.isShowStock}
                onValueChange={(value: any) => data.handleStateChange('isShowStock', value)}
              />
            </>
          }
        />
      </BaseComponent>
      <HStack style={styles.boxContainer}>
        <SubmitButton
          onPress={data.onCancel}
          title='cancel'
          width={'30%'}
          borderRadius={screenWidth(50)}
          backgroundColor={colors.white}
          borderColor={colors.red}
          borderWidth={screenWidth(2)}
          color={colors.red}
        />
        <SubmitButton
          onPress={data.onSave}
          title='save'
          width={'66%'}
          borderRadius={screenWidth(50)}
        />
      </HStack>
      <SafeAreaView style={{ backgroundColor: colors.white }} />
      {
        loading && <SpinnerLoading />
      }
    </>
  )
}

export default AddProduct

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