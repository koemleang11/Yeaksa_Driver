import { Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/dispatch';
import { loadLoading, loadMore } from '../../redux/actions';
import { requestClassification } from '../../redux/actions/classification';
import AddProduct from './AddProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'apisauce';
import { baseUrl } from '../../services/api/index.service';
import StatusModal from '../../component/modal/StatusModal';
import { useDisclose } from 'native-base';
import { goBack } from '../../services/navigate/navigation';
import { RoutesParams } from '../../temp/Routes';

export const defaultState = {
  classification: {},
  brandName: 'Yeaksa',
  productName: '',
  thumbnail: '',
  productPrice: '',
  discountType: '',
  discountAmount: '',
  expireDate: '',
  qtyInStock: '',
  warningQty: '',
  buyMinQty: '',
  description: '',
  isSEOMeta: false,
  isFreeDelivery: false,
  isShowStock: false,
  metaKeyWord: 'Yeaksa',
};

const AddProductScreen = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState<any>(defaultState);

  useEffect(() => {
    dispatch(loadMore(true));
    dispatch(requestClassification());
  }, []);

  const handleStateChange = (name: string, value: any) => {
    state[name] = value;
    setState({ ...state });
  };

  async function UploadProduct(object: any) {
    dispatch(loadLoading(true));
    let token = await AsyncStorage.getItem('@token');
    const apiSauce = create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return new Promise(async (resolve, reject) => {
      try {
        apiSauce.post('store-product', object).then((response: any) => {
          resolve(response.data);
          dispatch(loadLoading(false));
          if (response.data.message) {
            setSuccess(true);
            setState({ ...defaultState });
          } else {
            setSuccess(false);
          }
          onOpen();
          setTimeout(() => {
            onClose();
          }, 2000);
        });
      } catch (error) {
        console.log(`Request URL : ${baseUrl}${'store-product'}`);
        console.log('error===', error);
        reject(error);
      }
    });
  }

  const onSave = () => {
    Alert.alert('Save', 'Are you sure you want to add new product?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes', onPress: () => {
          dispatch(loadLoading(true));
          UploadProduct({
            "shop_name": 'Phsar Tech',
            "product_name": state.productName,
            "shop_product_id": "0001",
            "brand_name": state.brandName,
            "brand_image": "http://127.0.0.1:8000/uploads/16813703108789.Adidas_Logo.svg.png",
            "classification_id": state.classification?.id,
            "classification_ids": [state.classification?.id],
            "keyword": state.metaKeyWord,
            "qty": state.qtyInStock,
            "unit_id": 1,
            "retail_price": state.productPrice,
            "discount": state.discountAmount,
            "price_after_discount": state.productPrice - state.discountAmount,
            "gift_image": ["http://127.0.0.1:8000/uploads/16813703108789.Adidas_Logo.svg.png"],
            "is_free_delivery": state.isFreeDelivery ? 1 : 0,
            "photos": [state.thumbnail]
          });
        }
      },
    ]);
  }

  console.log(state.thumbnail)

  const onCancel = () => {
    Alert.alert('Unsaved changes', 'Are you sure you want to discard changes?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes', onPress: () => {
          setState({ ...defaultState });
          goBack();
        }
      },
    ]);
  }

  return (
    <>
      <AddProduct data={{
        type: RoutesParams.AddProduct,
        classification: state?.classification,
        brandName: state?.brandName,
        productName: state?.productName,
        thumbnail: state?.thumbnail,
        productPrice: state?.productPrice,
        discountType: state?.discountType,
        discountAmount: state?.discountAmount,
        expireDate: state?.expireDate,
        qtyInStock: state?.qtyInStock,
        warningQty: state?.warningQty,
        buyMinQty: state?.buyMinQty,
        description: state?.description,
        isFreeDelivery: state?.isFreeDelivery,
        isSEOMeta: state?.isSEOMeta,
        isShowStock: state?.isShowStock,
        metaKeyWord: state?.metaKeyWord,
        handleStateChange: handleStateChange,
        onSave: onSave,
        onCancel: onCancel,
      }} />
      <StatusModal
        isOpen={isOpen}
        onClose={onClose}
        isSuccess={success}
        title={success ? 'successfully' : 'create_failed'}
        subTitle={success ? 'product_has_been_created' : 'something_went_wrong'}
      />
    </>
  )
}

export default AddProductScreen

const styles = StyleSheet.create({})