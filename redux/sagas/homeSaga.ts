import { put, call, takeEvery } from 'redux-saga/effects';
import Api from 'shared/config/api';
import { URL_SEARCH_STORIES } from 'shared/constant/endpoints';
import { Action, ResponseGenerator } from 'types/action';
import { StoryConstant, REQUEST, SUCCESS, FAILURE } from '../constants';
import { toast } from 'react-toastify';

function* paginationStories(action: Action) {
  const { params } = action.payload || {};
  try {
    const searchStoriesApi = Api.get(URL_SEARCH_STORIES, { params });
    const response: ResponseGenerator = yield call(() => searchStoriesApi);
    if (response?.data?.data) {
      yield put({
        type: SUCCESS(action.type),
        payload: {
          response: {
            stories: response?.data?.data.stories,
          }
        },
      });
    }
  } catch (error) {
  toast.error('Lấy danh sách thất bại')
    yield put({
      type: FAILURE(action.type),
      error,
    });
  }
}

function* homeSaga() {
  yield takeEvery(StoryConstant.TOP_STORIES, paginationStories);
  yield takeEvery(StoryConstant.NEW_CHAP_STORIES, paginationStories);
  yield takeEvery(StoryConstant.NEW_STORIES, paginationStories);
}

export default homeSaga;
