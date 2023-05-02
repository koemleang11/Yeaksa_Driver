import { all } from 'redux-saga/effects';
import { classificationWatchSaga } from './classification.saga';
import { productWatchSaga } from './product.saga';
import { productDetailWatchSaga } from './productDetail.saga';
import { profileWatchSaga } from './profile.saga';
import { sizeListWatchSaga } from './sizeList.saga';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    profileWatchSaga(),
    productWatchSaga(),
    productDetailWatchSaga(),
    classificationWatchSaga(),
    sizeListWatchSaga(),
  ]);
}
