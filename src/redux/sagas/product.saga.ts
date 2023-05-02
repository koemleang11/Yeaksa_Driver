import { getProduct } from './../../api/Product';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loadMore, loadRefreshing } from '../actions';
import { loadProductError, loadProductSuccess, requestProduct } from '../actions/product';

export function* productSaga(action: any): any {
  try {
    const response: any = yield call(getProduct, action.payload);
    if (response.message) {
      yield put(loadProductSuccess(response.data));
      yield put(loadMore(false));
      yield put(loadRefreshing(false));
    } else {
      yield put(loadMore(false));
      yield put(loadProductError);
      yield put(loadRefreshing(false));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* productWatchSaga() {
  yield takeEvery(requestProduct.type, productSaga);
}
