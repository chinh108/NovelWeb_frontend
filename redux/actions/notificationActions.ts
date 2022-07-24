import { Payload } from 'types/action';
import {notificationConstant,REQUEST} from "redux/constants";

export const getNotification = (payload: Payload) => ({
  type: REQUEST(notificationConstant.GET_COMMENTS_FOR_NOTIFICATION),
  payload,
});
