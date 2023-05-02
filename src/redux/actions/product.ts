import {createAction} from '@reduxjs/toolkit';

const clearProduct = createAction('product/clear');
const requestProduct = createAction<any>('product/request');
const loadProductSuccess = createAction<any>('product/success');
const loadProductError = createAction<any>('product/error');

export {
  clearProduct,
  requestProduct,
  loadProductSuccess,
  loadProductError,
};
