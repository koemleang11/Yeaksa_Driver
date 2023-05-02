import {
  FlatList,
  FlatListProps,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import NoData from './NoData';
import {useAppSelector} from '../../hooks/dispatch';
export const makeid = () => {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?:|.,';
  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

export const FlatListVertical = React.forwardRef((props: any, ref: any) => {
  const loading = useAppSelector(state => state.loading);
  const keyExtractor = useCallback((_: any, index: any) => {
    return index.toString();
  }, []);
  const getItemLayout = useCallback(
    (_: any, index: any) => ({
      length: props.ITEM_HEIGHT,
      offset: props.ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      ref={ref}
      listKey={makeid()}
      cellKey={makeid()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={Platform.OS == 'ios' ? false : true}
      data={props.data}
      // bounces={false}
      scrollEventThrottle={16}
      nestedScrollEnabled
      onEndReachedThreshold={0.01}
      renderItem={props.renderItem}
      getItemLayout={props.ITEM_HEIGHT ? getItemLayout : null}
      keyExtractor={keyExtractor}
      {...props}
      keyboardShouldPersistTaps={
        props.keyboardShouldPersistTaps ? 'handled' : undefined
      }
      // legacyImplementation
    />
  );
});
