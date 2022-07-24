import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import authSaga from 'redux/sagas/authSaga';
import storySaga from 'redux/sagas/storySaga';
import discussSaga from './sagas/discussSaga';
import homeSaga from './sagas/homeSaga';
import detailStorySaga from './sagas/detailStorySaga';
import commentSaga from './sagas/commentSaga';
import notificationSaga from "./sagas/notificationSaga";

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
  yield all([
    authSaga(),
    storySaga(),
    discussSaga(),
    homeSaga(),
    detailStorySaga(),
    commentSaga(),
    notificationSaga()
  ]);
}
