import { getClassification } from './../../api/Classification';
import { getProduct } from './../../api/Product';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loadLoading, loadRefreshing } from '../actions';
import { loadClassificationError, loadClassificationSuccess, requestClassification } from '../actions/classification';

export function* classificationSaga(action: any): any {
  try {
    const response: any = yield call(getClassification, action.payload);
    if (response.message) {
      yield put(loadClassificationSuccess(response.data));
      yield put(loadLoading(false));
      yield put(loadRefreshing(false));
    } else {
      yield put(loadLoading(false));
      yield put(loadClassificationError);
      yield put(loadRefreshing(false));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* classificationWatchSaga() {
  yield takeEvery(requestClassification.type, classificationSaga);
}
