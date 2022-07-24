import { Payload } from 'types/action';
import { REQUEST, detailStory } from '../constants';

export const getDetailStory = (payload: Payload) => ({
  type: REQUEST(detailStory.GET_DEATIL_STORY),
  payload,
});

export const otherStories = (payload: Payload) => ({
  type: REQUEST(detailStory.OTHER_STORIES),
  payload,
});
