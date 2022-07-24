import {call, put, takeEvery} from 'redux-saga/effects';
import Api from 'shared/config/api';
import {URL_NOTIFICATION} from 'shared/constant/endpoints';
import {Action, ResponseGenerator} from 'types/action';
import {FAILURE, notificationConstant, REQUEST, SUCCESS} from '../constants';
import {toast} from 'react-toastify';

function* getNotification(action: Action) {
    const {params} = action.payload || {};
    try {
        const getNotification = Api.get(URL_NOTIFICATION, {params});
        const response: ResponseGenerator = yield call(() => getNotification);
        yield put({
            type: SUCCESS(notificationConstant.GET_COMMENTS_FOR_NOTIFICATION),
            payload: response.data?.data,
        });

    } catch (error) {
        toast.error('Lấy thông báo thất bại')
        yield put({
            type: FAILURE(notificationConstant.GET_COMMENTS_FOR_NOTIFICATION),
            error,
        });
    }
}


function* notificationSaga() {
    yield takeEvery(REQUEST(notificationConstant.GET_COMMENTS_FOR_NOTIFICATION), getNotification);
}

export default notificationSaga;
