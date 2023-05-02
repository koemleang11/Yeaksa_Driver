import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TextTranslate} from '../../component/custom/Label';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import {Battambang} from '../../services/config/fonts';
import ProductCard from '../../component/product/ProductCard';
import {useAppDispatch, useAppSelector} from '../../hooks/dispatch';
import {clearProduct, requestProduct} from '../../redux/actions/product';
import {loadLoading, loadMore, loadRefreshing} from '../../redux/actions';
import {navigate} from '../../services/navigate/navigation';
import {Routes, RoutesParams} from '../../temp/Routes';
import {HStack} from 'native-base';
import ClassificationDropDown from '../../component/dashboard/ClassificationDropDown';
import {FlatListVertical} from '../../component/custom/FlatListVertical';
import NoData from '../../component/custom/NoData';
import {style} from '../../styles/style';
import ProductLoading from '../../component/loading/ProductLoading';
import {requestClassification} from '../../redux/actions/classification';

const ProductScreen = () => {
  const dispatch = useAppDispatch();
  const loadMoreState = useAppSelector(state => state.loadMore);
  const refreshing = useAppSelector(state => state.refreshing);
  const productState = useAppSelector(state => state.product);
  const classificationState = useAppSelector(
    state => state.classification.data,
  );
  const [classification, setClassification] = useState<any>();

  useEffect(() => {
    dispatch(loadLoading(true));
    dispatch(requestClassification());
  }, []);

  useEffect(() => {
    classificationState?.length > 0 &&
      setClassification(classificationState[0]);
  }, [classificationState]);

  useEffect(() => {
    if (classification) {
      dispatch(loadMore(true));
      dispatch(clearProduct());
      dispatch(requestProduct({id: classification?.id}));
    }
  }, [classification]);

  const onRefresh = () => {
    dispatch(loadRefreshing(true));
    dispatch(clearProduct());
    dispatch(requestProduct({id: classification?.id}));
  };

  const onEdit = (item: any) => {
    navigate(Routes.EditProduct, {productID: item.id});
  };

  const _renderItem = useCallback(
    ({item}: any) => {
      return (
        <ProductCard
          image={item?.product_image}
          category={item?.brand_name}
          name={item?.product_name?.en}
          price={item?.price}
          quantity={item?.qty}
          onEdit={() => onEdit(item)}
          onPublish={() => {}}
        />
      );
    },
    [productState],
  );

  return (
    <View style={styles.container}>
      <HStack
        style={{
          ...style.row,
          marginTop: -screenWidth(5),
          marginBottom: screenWidth(5),
          zIndex: 100,
        }}>
        <TextTranslate
          style={{
            ...styles.title,
            textAlignVertical: 'center',
          }}>
          all_products
        </TextTranslate>
        <ClassificationDropDown
          data={classificationState}
          value={classification}
          onSelectedChange={(value: any) => {
            setClassification(value);
          }}
        />
      </HStack>
      {loadMoreState || refreshing ? (
        <ProductLoading />
      ) : productState?.listing?.length === 0 ? (
        <NoData title="empty_product" />
      ) : (
        <FlatListVertical
          refreshing={refreshing}
          onRefresh={onRefresh}
          maxToRenderPerBatch={1}
          initialNumToRender={1}
          data={productState?.listing}
          renderItem={_renderItem}
          ListFooterComponent={
            <>{(refreshing || loadMoreState) && <ProductLoading />}</>
          }
        />
      )}
    </View>
  );
};

export default React.memo(ProductScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding_horizontal,
    backgroundColor: colors.backgroundColor,
  },
  title: {
    color: colors.black,
    fontSize: size.font20,
    marginLeft: screenWidth(3),
  },
  value: {
    color: colors.white,
    fontSize: size.font24,
    ...Battambang,
    marginBottom: -screenWidth(10),
  },
});
