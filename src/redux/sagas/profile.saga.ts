import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {getProfile} from '../../api/Profile';
import {loadLoading, loadRefreshing} from '../actions';
import { loadProfileError, loadProfileSuccess, requestProfile } from '../actions/profile';

export function* profileSaga(): any {
  try {
    const response: any = yield call(getProfile);
    if (response.message) {
      if (response.data) {
        yield put(loadProfileSuccess(response));
      }
      yield put(loadLoading(false));
      yield put(loadRefreshing(false));
    } else {
      yield put(loadLoading(false));
      yield put(loadProfileError);
      yield put(loadRefreshing(false));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* profileWatchSaga() {
  yield takeEvery(requestProfile.type, profileSaga);
}
