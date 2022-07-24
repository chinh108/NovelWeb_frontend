import { put, call, takeEvery } from 'redux-saga/effects';
import Api from 'shared/config/api';
import { URL_ALL_STORIES, URL_CHAPPER, URL_OWN_STORIES, URL_SEARCH_STORIES, URL_STORY } from 'shared/constant/endpoints';
import { Action, ResponseGenerator } from 'types/action';
import { StoryConstant, REQUEST, SUCCESS, FAILURE } from '../constants';
import { toast } from 'react-toastify';
import Router from 'next/router';

function* createStory(action: Action) {
  const { params } = action.payload || {};
  try {
    const createStoryApi = Api.post(URL_STORY, params);
    const response: ResponseGenerator = yield call(() => createStoryApi);
    if (response?.data?.data) {
      toast.success('Thêm truyện thành công')
      yield put({
        type: SUCCESS(StoryConstant.CREATE_STORY),
        payload: {},
      });
      Router.push('/admin/sang-tac')
    }
  } catch (error) {
  toast.error('Thêm truyện thất bại')
    yield put({
      type: FAILURE(StoryConstant.CREATE_STORY),
      error,
    });
  }
}

function* getOwnStories(action: Action) {
  try {
    const getOwnStoriesApi = Api.get(URL_OWN_STORIES);
    const response: ResponseGenerator = yield call(() => getOwnStoriesApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(StoryConstant.GET_OWN_STORIES),
        payload: {
          response: {
            stories: response?.data?.data
          }
        },
      });
    }
  } catch (error) {
  toast.error('Lối khi lấy danh sách truyện')
    yield put({
      type: FAILURE(StoryConstant.GET_OWN_STORIES),
      error,
    });
  }
}

function* getStoryId(action: Action) {
  const { params, callback } = action.payload || {};
  try {
    const getStoryApi = Api.get(URL_STORY, { params });
    const response: ResponseGenerator = yield call(() => getStoryApi);
    if (response?.data?.data) {
      callback?.(response?.data?.data)
    }
  } catch (error) {
  toast.error('Lỗi lấy thông tin truyện');
  Router.push('/admin/sang-tac')
  }
}

function* createChapper(action: Action) {
  const { params } = action.payload || {};
  try {
    const createChapperApi = Api.post(URL_CHAPPER, params);
    const response: ResponseGenerator = yield call(() => createChapperApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(StoryConstant.CREATE_CHAPPER),
        payload: {
          response: response?.data?.data
        },
      });
      toast.success('Thêm chương thành công')
      Router.push('/admin/sang-tac')
    }
  } catch (error) {
  toast.error('Thêm chương thất bại')
    yield put({
      type: FAILURE(StoryConstant.CREATE_CHAPPER),
      error,
    });
  }
}

function* getAllStories(action: Action) {
  const { callback } = action.payload || {};
  try {
    const getAllStoriesApi = Api.get(URL_ALL_STORIES);
    const response: ResponseGenerator = yield call(() => getAllStoriesApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(StoryConstant.GET_ALL_STORIES),
        payload: {
          response: {
            stories: response?.data?.data
          }
        },
      });
      callback?.(response?.data?.data?.[0])
    }
  } catch (error) {
  toast.error('Lấy danh sách cuộc thảo luận thất bại')
    yield put({
      type: FAILURE(StoryConstant.GET_ALL_STORIES),
      error,
    });
  }
}

function* searchStories(action: Action) {
  const { params } = action.payload || {};
  try {
    const searchStoriesApi = Api.get(URL_SEARCH_STORIES, { params });
    const response: ResponseGenerator = yield call(() => searchStoriesApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(StoryConstant.SEARCH_STORIES),
        payload: {
          response: {
            stories: response?.data?.data.stories,
            pagination: response?.data?.data.pagination
          }
        },
      });
    }
  } catch (error) {
  toast.error('Lấy danh sách thất bại')
    yield put({
      type: FAILURE(StoryConstant.SEARCH_STORIES),
      error,
    });
  }
}

function* deleteStory(action: Action) {
  const { params } = action.payload || {};
  try {
    const deleteApi = Api.delete(URL_STORY, { params });
    const response: ResponseGenerator = yield call(() => deleteApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(StoryConstant.DELETE_STORY),
        payload: {},
      });
    }
  } catch (error) {
  toast.error('Xoá sáng tác thất bại')
    yield put({
      type: FAILURE(StoryConstant.DELETE_STORY),
      error,
    });
  }
}

function* storySaga() {
  yield takeEvery(REQUEST(StoryConstant.CREATE_STORY), createStory);
  yield takeEvery(REQUEST(StoryConstant.GET_OWN_STORIES), getOwnStories);
  yield takeEvery(REQUEST(StoryConstant.GET_SOTRY_ID), getStoryId);
  yield takeEvery(REQUEST(StoryConstant.CREATE_CHAPPER), createChapper);
  yield takeEvery(REQUEST(StoryConstant.GET_ALL_STORIES), getAllStories);
  yield takeEvery(REQUEST(StoryConstant.SEARCH_STORIES), searchStories);
  yield takeEvery(REQUEST(StoryConstant.DELETE_STORY), deleteStory);
}

export default storySaga;
