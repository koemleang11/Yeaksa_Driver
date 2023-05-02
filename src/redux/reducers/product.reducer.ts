import _ from 'lodash';
import {createReducer} from '@reduxjs/toolkit';
import { clearProduct, loadProductError, loadProductSuccess } from '../actions/product';

const initialState = {
  listing: <any>[],
  data: null || <any>{},
};

const ProductReducer = createReducer(initialState, builder => {
  builder
    .addCase(clearProduct, state => {
      state.listing = [];
      state.data = null;
    })
    .addCase(loadProductSuccess, (state, action: any) => {
      let _data = [...state.listing, ...action.payload.data];
      let datas = _.uniqBy(_data, 'id');
      state.listing = datas;
      state.data = action.payload;
    })
    .addCase(loadProductError, (state, action) => {
      state.listing = [];
      state.data = action.payload;
    });
});

export {ProductReducer};
