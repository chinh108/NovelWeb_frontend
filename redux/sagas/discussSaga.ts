import { put, call, takeEvery } from 'redux-saga/effects';
import Api from 'shared/config/api';
import { URL_ALL_DISCUSS, URL_OWN_DISCUSS, URL_DISCUSS, URL_DISCUSS_BY_STORY } from 'shared/constant/endpoints';
import { Action, ResponseGenerator } from 'types/action';
import { discussConstant, REQUEST, SUCCESS, FAILURE } from '../constants';
import { toast } from 'react-toastify';
import Router from 'next/router';

function* createDiscuss(action: Action) {
  const { params } = action.payload || {};
  try {
    const createDiscussApi = Api.post(URL_DISCUSS, params);
    const response: ResponseGenerator = yield call(() => createDiscussApi);
    if (response?.data?.data) {
      toast.success('Thêm cuộc thảo luận thành công')
      yield put({
        type: SUCCESS(discussConstant.CREATE_DISUCSS),
        payload: {},
      });
      Router.push('/admin/thao-luan')
    }
  } catch (error) {
  toast.error('Thêm cuộc thảo luận thất bại')
    yield put({
      type: FAILURE(discussConstant.CREATE_DISUCSS),
      error,
    });
  }
}

function* getOwnDiscuss(action: Action) {
  try {
    const getOwnDiscussApi = Api.get(URL_OWN_DISCUSS);
    const response: ResponseGenerator = yield call(() => getOwnDiscussApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(discussConstant.GET_OWN_DISCUSS),
        payload: {
          response: response?.data?.data
        },
      });
    }
  } catch (error) {
  toast.error('Lối khi lấy danh sách cuộc thảo luận')
    yield put({
      type: FAILURE(discussConstant.GET_OWN_DISCUSS),
      error,
    });
  }
}

function* getAllDiscuss(action: Action) {
  const { params } = action.payload || {};
  try {
    const getAllDiscussApi = Api.get(URL_ALL_DISCUSS, { params });
    const response: ResponseGenerator = yield call(() => getAllDiscussApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(discussConstant.GET_ALL_DISCUSS),
        payload: {
          response: response?.data?.data
        },
      });
    }
  } catch (error) {
  toast.error('Lấy danh sách cuộc thảo luận thất bại')
    yield put({
      type: FAILURE(discussConstant.GET_ALL_DISCUSS),
      error,
    });
  }
}

function* getDiscussByStory(action: Action) {
  const { params } = action.payload || {};
  try {
    const getDiscussApi = Api.get(URL_DISCUSS_BY_STORY, { params });
    const response: ResponseGenerator = yield call(() => getDiscussApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(discussConstant.GET_DISCUSS_By_STORY),
        payload: {
          response: response?.data?.data
        },
      });
    }
  } catch (error) {
  toast.error('Lối khi lấy danh sách cuộc thảo luận')
    yield put({
      type: FAILURE(discussConstant.GET_DISCUSS_By_STORY),
      error,
    });
  }
}

function* getDiscussById(action: Action) {
  const { params } = action.payload || {};
  try {
    const getDiscussApi = Api.get(URL_DISCUSS, { params });
    const response: ResponseGenerator = yield call(() => getDiscussApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(discussConstant.GET_DISCUSS_ID),
        payload: {
          response: response?.data?.data
        },
      });
    }
  } catch (error) {
  toast.error('Lối khi lấy thông tin cuộc thảo luận')
  Router.push('/thao-luan')
    yield put({
      type: FAILURE(discussConstant.GET_DISCUSS_ID),
      error,
    });
  }
}

function* deleteDiscuss(action: Action) {
  const { params } = action.payload || {};
  try {
    const deleteApi = Api.delete(URL_DISCUSS, { params });
    const response: ResponseGenerator = yield call(() => deleteApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(discussConstant.DELETE_DISCUSS),
        payload: {},
      });
    }
  } catch (error) {
  toast.error('Xoá sáng tác thất bại')
    yield put({
      type: FAILURE(discussConstant.DELETE_DISCUSS),
      error,
    });
  }
}

function* discussSaga() {
  yield takeEvery(REQUEST(discussConstant.CREATE_DISUCSS), createDiscuss);
  yield takeEvery(REQUEST(discussConstant.GET_OWN_DISCUSS), getOwnDiscuss);
  yield takeEvery(REQUEST(discussConstant.GET_ALL_DISCUSS), getAllDiscuss);
  yield takeEvery(REQUEST(discussConstant.GET_DISCUSS_By_STORY), getDiscussByStory);
  yield takeEvery(REQUEST(discussConstant.GET_DISCUSS_ID), getDiscussById);
  yield takeEvery(REQUEST(discussConstant.DELETE_DISCUSS), deleteDiscuss);
}

export default discussSaga;
