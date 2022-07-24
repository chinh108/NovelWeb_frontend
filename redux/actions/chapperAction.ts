import { chapperConstant, REQUEST } from 'redux/constants';
import { Payload } from 'types/action';

export const getChapper = (payload: Payload) => ({
  type: REQUEST(chapperConstant.GET_CHAPPER),
  payload,
});
