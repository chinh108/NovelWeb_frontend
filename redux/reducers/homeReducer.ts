import { Action } from 'types/action';
import { StoryConstant } from '../constants/storyConstant';
import { FAILURE, SUCCESS } from '../constants';

const initialState = {
  loadingTopStories: false,
  loadingNewChapStories: false,
  loadingNewStories: false,
  isError: false,
  topStories: [],
  newChapStories: [],
  newStories: [],
};

const reducer = (state = initialState, action: Action) => {
  const { payload, error } = action;
  switch (action.type) {
    case StoryConstant.TOP_STORIES:
      return {
        ...state,
        loadingTopStories: true,
        isError: false,
        topStories: []
      };
    case SUCCESS(StoryConstant.TOP_STORIES):
      return {
        ...state,
        loadingTopStories: false,
        isError: false,
        topStories: payload?.response?.stories,
      };
    case FAILURE(StoryConstant.TOP_STORIES):
      return {
        ...state,
        loadingTopStories: false,
        isError: true,
      };
    case StoryConstant.NEW_CHAP_STORIES:
      return {
        ...state,
        loadingNewChapStories: true,
        isError: false,
        newChapStories: []
      };
    case SUCCESS(StoryConstant.NEW_CHAP_STORIES):
      return {
        ...state,
        loadingNewChapStories: false,
        isError: false,
        newChapStories: payload?.response?.stories,
      };
    case FAILURE(StoryConstant.NEW_CHAP_STORIES):
      return {
        ...state,
        loadingNewChapStories: false,
        isError: true,
      };
    case StoryConstant.NEW_STORIES:
      return {
        ...state,
        loadingNewStories: true,
        isError: false,
        newStories: []
      };
    case SUCCESS(StoryConstant.NEW_STORIES):
      return {
        ...state,
        loadingNewStories: false,
        isError: false,
        newStories: payload?.response?.stories,
      };
    case FAILURE(StoryConstant.NEW_STORIES):
      return {
        ...state,
        loadingNewStories: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default reducer;
