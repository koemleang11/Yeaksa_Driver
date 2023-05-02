import {call, put, takeEvery} from 'redux-saga/effects';
import { getListSize } from '../../api/ListSize';
import {loadLoading, loadRefreshing} from '../actions';
import { loadListSizeError, loadListSizeSuccess, requestListSize } from '../actions/listSize';

export function* sizeListSaga(): any {
  try {
    const response: any = yield call(getListSize);
    if (response.message) {
      if (response.data) {
        yield put(loadListSizeSuccess(response));
      }
      yield put(loadLoading(false));
    } else {
      yield put(loadLoading(false));
      yield put(loadListSizeError);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* sizeListWatchSaga() {
  yield takeEvery(requestListSize.type, sizeListSaga);
}
