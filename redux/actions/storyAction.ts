import { Payload } from 'types/action';
import { REQUEST, StoryConstant } from '../constants';

export const createStory = (payload: Payload) => ({
  type: REQUEST(StoryConstant.CREATE_STORY),
  payload,
});

export const getOwnStories = () => ({
  type: REQUEST(StoryConstant.GET_OWN_STORIES)
});

export const getStoryId = (payload: Payload) => ({
  type: REQUEST(StoryConstant.GET_SOTRY_ID),
  payload,
});

export const createChapper = (payload: Payload) => ({
  type: REQUEST(StoryConstant.CREATE_CHAPPER),
  payload,
});

export const getAllStories = (payload: Payload) => ({
  type: REQUEST(StoryConstant.GET_ALL_STORIES),
  payload,
});

export const searchStories = (payload: Payload) => ({
  type: REQUEST(StoryConstant.SEARCH_STORIES),
  payload,
});

export const deleteStory = (payload: Payload) => ({
  type: REQUEST(StoryConstant.DELETE_STORY),
  payload,
});
