import {createAction} from '@reduxjs/toolkit';

const requestProductDetail = createAction<any>('productDetail/request');
const loadProductDetailSuccess = createAction<any>('productDetail/success');
const loadProductDetailError = createAction<any>('productDetail/error');

export {
  requestProductDetail,
  loadProductDetailSuccess,
  loadProductDetailError,
};
