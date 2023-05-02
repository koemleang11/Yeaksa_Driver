import { Alert, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';
import { loadLoading, loadMore } from '../../redux/actions';
import { requestClassification } from '../../redux/actions/classification';
import AddProduct from './AddProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'apisauce';
import { baseUrl } from '../../services/api/index.service';
import StatusModal from '../../component/modal/StatusModal';
import { useDisclose } from 'native-base';
import { goBack } from '../../services/navigate/navigation';
import { requestProductDetail } from '../../redux/actions/productDetail';
import { RoutesParams } from '../../temp/Routes';
import { defaultState } from './AddProductScreen';

const EditProductScreen = (props: any) => {
    const { productID } = props.route.params;
    const { isOpen, onOpen, onClose } = useDisclose();
    const classificationState = useAppSelector(state => state.classification.data);
    const productDetail = useAppSelector(state => state.productDetail.data);
    const dispatch = useAppDispatch();
    const [success, setSuccess] = useState(false);
    const [state, setState] = useState<any>(defaultState);

    const handleStateChange = (name: string, value: any) => {
        state[name] = value;
        setState({ ...state });
    };

    useEffect(() => {
        if (productID) {
            dispatch(loadLoading(true));
            dispatch(requestProductDetail({ id: productID }));
        }
    }, [productID]);

    useEffect(() => {
        if (productDetail?.classification_id && classificationState) {
            let _classification = classificationState.filter((value: any) => value?.id == productDetail?.classification_id);
            setState({
                ...state,
                id: productDetail?.id,
                classification: _classification[0],
                brandName: productDetail?.brand_name,
                productName: productDetail?.product_name,
                thumbnail: productDetail?.photos[0],
                productPrice: productDetail?.retail_price,
                discountAmount: productDetail?.discount,
                qtyInStock: productDetail?.qty,
            })
        }
    }, [productDetail]);

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
                apiSauce.post('update-product', object).then((response: any) => {
                    resolve(response.data);
                    dispatch(loadLoading(false));
                    if (response.data.message) {
                        setSuccess(true);
                        setState({ ...defaultState });
                        setTimeout(goBack, 2000);
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
        Alert.alert('Save', 'Are you sure you want to save product?', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: () => {
                    UploadProduct({
                        id: state.id,
                        shop_name: 'Phsar Tech',
                        product_name: state.productName,
                        shop_product_id: "0001",
                        brand_name: state.brandName,
                        brand_image: "http://127.0.0.1:8000/uploads/16813703108789.Adidas_Logo.svg.png",
                        classification_id: state.classification?.id,
                        classification_ids: [state.classification?.id],
                        keyword: state.metaKeyWord,
                        qty: state.qtyInStock,
                        unit_id: 1,
                        retail_price: state.productPrice,
                        discount: state.discountAmount,
                        price_after_discount: state.productPrice - state.discountAmount,
                        gift_image: ["http://127.0.0.1:8000/uploads/16813703108789.Adidas_Logo.svg.png"],
                        is_free_delivery: state.isFreeDelivery ? 1 : 0,
                        photos: [state?.thumbnail]
                    });
                }
            },
        ]);
    }

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
                type: RoutesParams.EditProduct,
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

export default EditProductScreen

const styles = StyleSheet.create({})