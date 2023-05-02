import { getProduct, getProductDetail } from './../../api/Product';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loadLoading } from '../actions';
import { loadProductDetailError, loadProductDetailSuccess, requestProductDetail } from '../actions/productDetail';

export function* productDetailSaga(action: any): any {
  try {
    const response: any = yield call(getProductDetail, action.payload);
    if (response.message) {
      yield put(loadProductDetailSuccess(response.data));
      yield put(loadLoading(false));
    } else {
      yield put(loadLoading(false));
      yield put(loadProductDetailError);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* productDetailWatchSaga() {
  yield takeEvery(requestProductDetail.type, productDetailSaga);
}
