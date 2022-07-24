import { Payload } from 'types/action';
import { REQUEST, discussConstant } from '../constants';

export const createDiscuss = (payload: Payload) => ({
  type: REQUEST(discussConstant.CREATE_DISUCSS),
  payload,
});

export const getOwnDiscuss = () => ({
  type: REQUEST(discussConstant.GET_OWN_DISCUSS)
});

export const getdiscussId = (payload: Payload) => ({
  type: REQUEST(discussConstant.GET_DISCUSS_ID),
  payload,
});

export const getDiscuss = (payload: Payload) => ({
  type: REQUEST(discussConstant.GET_ALL_DISCUSS),
  payload,
});

export const getDiscussByStory = (payload: Payload) => ({
  type: REQUEST(discussConstant.GET_DISCUSS_By_STORY),
  payload,
});

export const deleteDiscuss = (payload: Payload) => ({
  type: REQUEST(discussConstant.DELETE_DISCUSS),
  payload,
});
