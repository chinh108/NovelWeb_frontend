import { put, call, takeEvery } from 'redux-saga/effects';
import Api from 'shared/config/api';
import { URL_CHAPPER, URL_OTHER_STORIES, URL_STORY_DETAIL } from 'shared/constant/endpoints';
import { Action, ResponseGenerator } from 'types/action';
import { detailStory as detailStoryConstant, REQUEST, SUCCESS, FAILURE, chapperConstant } from '../constants';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { LocalStorage } from 'shared/config/localStorage';
import { LocalStorageKey } from 'shared/constant/common';

function* detailStory(action: Action) {
  const { params } = action.payload || {};
  try {
    const getStoryApi = Api.get(URL_STORY_DETAIL, { params });
    const response: ResponseGenerator = yield call(() => getStoryApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(detailStoryConstant.GET_DEATIL_STORY),
        payload: {
          response: response.data?.data
        },
      });
    }
  } catch (error) {
    toast.error('Lỗi lấy thông tin truyện');
    Router.push('/404')
    yield put({
      type: FAILURE(detailStoryConstant.GET_DEATIL_STORY),
    });
  }
}

function* otherStories(action: Action) {
  const { params } = action.payload || {};
  try {
    const getStoryApi = Api.get(URL_OTHER_STORIES, { params });
    const response: ResponseGenerator = yield call(() => getStoryApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(detailStoryConstant.OTHER_STORIES),
        payload: {
          response: response.data?.data
        },
      });
    }
  } catch (error) {
    toast.error('Lỗi lấy thông tin truyện');
    yield put({
      type: FAILURE(detailStoryConstant.OTHER_STORIES),
    });
  }
}

const saveRecent = (data: any) => {
  let recent: any = LocalStorage.get(LocalStorageKey.reading_series);
  if (!recent) {
    recent = [];
  } else {
    recent = JSON.parse(recent);
  }

  recent.pop();
  recent.unshift({
    storyTitle: data.story.title,
    storyUrl: `/truyen/${data.story.id}`,
    chapperTitle: data.title,
    chapperUrl: `/chap/${data.id}`
  })
  
  LocalStorage.add(LocalStorageKey.reading_series, JSON.stringify(recent))
}

function* detailChapper(action: Action) {
  const { params } = action.payload || {};
  try {
    const getChapperApi = Api.get(URL_CHAPPER, { params });
    const response: ResponseGenerator = yield call(() => getChapperApi);
    if (response?.data?.data) {
      saveRecent(response?.data?.data)
      yield put({
        type: SUCCESS(chapperConstant.GET_CHAPPER),
        payload: {
          response: response.data?.data
        },
      });
    }
  } catch (error) {
    toast.error('Lỗi lấy thông tin chương');
    Router.push('/404')
    yield put({
      type: FAILURE(chapperConstant.GET_CHAPPER),
    });
  }
}

function* detailStorySaga() {
  yield takeEvery(REQUEST(detailStoryConstant.GET_DEATIL_STORY), detailStory);
  yield takeEvery(REQUEST(detailStoryConstant.OTHER_STORIES), otherStories);
  yield takeEvery(REQUEST(chapperConstant.GET_CHAPPER), detailChapper);
}

export default detailStorySaga;
