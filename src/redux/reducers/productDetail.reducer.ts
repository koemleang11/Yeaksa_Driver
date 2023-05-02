import _ from 'lodash';
import {createReducer} from '@reduxjs/toolkit';
import { loadProductDetailError, loadProductDetailSuccess, requestProductDetail } from '../actions/productDetail';

const initialState = {
  data: null || <any>{},
};

const ProductDetailReducer = createReducer(initialState, builder => {
  builder
    .addCase(requestProductDetail, state => {
      state.data = null;
    })
    .addCase(loadProductDetailSuccess, (state, action: any) => {
      state.data = action.payload;
    })
    .addCase(loadProductDetailError, (state, action) => {
      state.data = action.payload;
    });
});

export {ProductDetailReducer};
