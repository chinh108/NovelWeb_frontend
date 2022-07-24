import { put, call, all, takeEvery } from 'redux-saga/effects';
import Api from 'shared/config/api';
import {URL_GET_ME, URL_LOGIN, URL_LOGIN_WITH_GOOGLE, URL_REGISTER} from 'shared/constant/endpoints';
import { CookiesStorage } from 'shared/config/cookie';
import { Action, ResponseGenerator } from 'types/action';
import { authConstants, REQUEST, SUCCESS, FAILURE } from '../constants';
import Router from 'next/router';
import { toast } from 'react-toastify';

function* login(action: Action) {
  const { params } = action.payload || {};
  try {
    const loginApi = Api.post(URL_LOGIN, params);
    const response: ResponseGenerator = yield call(() => loginApi);
    if (response?.data?.data?.accessToken) {
      toast.success('Đăng nhập thành công')
      CookiesStorage.setAccessToken(response.data.data.accessToken);
      yield put({
        type: SUCCESS(authConstants.LOGIN),
        payload: {},
      });
    }

    Router.push('/')
  } catch (error) {
  toast.error('Đăng nhập thất bại')
    yield put({
      type: FAILURE(authConstants.LOGIN),
      error,
    });
  }
}

function* loginWithGoogle(action: Action) {
  const { params } = action.payload || {};
  try {
    const loginWithGoogleApi = Api.post(URL_LOGIN_WITH_GOOGLE, params);
    const response: ResponseGenerator = yield call(() => loginWithGoogleApi);
    if (response?.data?.data?.accessToken) {
      toast.success('Đăng nhập với Google thành công')
      CookiesStorage.setAccessToken(response.data.data.accessToken);
      yield put({
        type: SUCCESS(authConstants.LOGIN_WITH_GOOGLE),
        payload: {},
      });
    }

    Router.push('/')
  } catch (error) {
  toast.error('Đăng nhập với Google thất bại')
    yield put({
      type: FAILURE(authConstants.LOGIN_WITH_GOOGLE),
      error,
    });
  }
}


function* register(action: Action) {
  const { params } = action.payload || {};
  try {
    const registerApi = Api.post(URL_REGISTER, params);
    const response: ResponseGenerator = yield call(() => registerApi);
    if (response?.data) {
      toast.success('Đăng kí thành công')

      yield put({
        type: SUCCESS(authConstants.REGISTER),
        payload: {},
      });
      Router.push('/dang-nhap')
    }

  } catch (error) {
    toast.error('Đăng kí thất bại')
    yield put({
      type: FAILURE(authConstants.REGISTER),
      error,
    });
  }
}

function* getMe(action: Action) {
  const { params } = action.payload || {};
  try {
    const getProfileApi = Api.get(URL_GET_ME, {
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      }
    });
    const response: ResponseGenerator = yield call(() => getProfileApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(authConstants.GET_ME),
        payload: response?.data?.data,
      });
    }

  } catch (error) {
    yield put({
      type: FAILURE(authConstants.GET_ME),
      error,
    });
  }
}

function* authSaga() {
  yield takeEvery(REQUEST(authConstants.LOGIN), login);
  yield takeEvery(REQUEST(authConstants.REGISTER), register);
  yield takeEvery(REQUEST(authConstants.GET_ME), getMe);
  yield takeEvery(REQUEST(authConstants.LOGIN_WITH_GOOGLE), loginWithGoogle);
}

export default authSaga;
