import { Action } from 'types/action';
import { StoryConstant } from '../constants/storyConstant';
import { FAILURE, REQUEST, SUCCESS } from '../constants';

const initialState = {
  isLoading: false,
  isError: false,
  stories: [],
  pagination: {}
};

const reducer = (state = initialState, action: Action) => {
  const { payload, error } = action;
  switch (action.type) {
    case REQUEST(StoryConstant.CREATE_STORY):
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case SUCCESS(StoryConstant.CREATE_STORY):
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    case FAILURE(StoryConstant.CREATE_STORY):
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REQUEST(StoryConstant.GET_OWN_STORIES):
    case REQUEST(StoryConstant.GET_ALL_STORIES):
    case REQUEST(StoryConstant.SEARCH_STORIES):
      return {
        ...state,
        isLoading: true,
        isError: false,
        stories: [],
        pagination: {}
      };
    case SUCCESS(StoryConstant.GET_OWN_STORIES):
    case SUCCESS(StoryConstant.GET_ALL_STORIES):
    case SUCCESS(StoryConstant.SEARCH_STORIES):
      return {
        ...state,
        isLoading: false,
        isError: false,
        stories: payload?.response?.stories,
        pagination: payload?.response?.pagination
      };
    case FAILURE(StoryConstant.GET_OWN_STORIES):
    case FAILURE(StoryConstant.GET_ALL_STORIES):
    case FAILURE(StoryConstant.SEARCH_STORIES):
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REQUEST(StoryConstant.CREATE_CHAPPER):
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case SUCCESS(StoryConstant.CREATE_CHAPPER):
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    case FAILURE(StoryConstant.CREATE_CHAPPER):
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REQUEST(StoryConstant.DELETE_STORY): {
      const idIndex = state.stories.findIndex((item: any) => item.id === payload?.params?.id);
      if (idIndex !== -1) {
        state.stories.splice(idIndex, 1);
      }

      return {
        ...state,
        stories: [...state.stories],
      };
    }
    default:
      return state;
  }
};

export default reducer;
