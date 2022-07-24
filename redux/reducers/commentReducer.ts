import { Action } from 'types/action';
import { commentConstant } from '../constants';
import { FAILURE, REQUEST, SUCCESS } from '../constants';

const initialState = {
  isLoading: false,
  isError: false,
  comments: [],
};

const reducer = (state = initialState, action: Action) => {
  const { payload, error } = action;
  switch (action.type) {
    case REQUEST(commentConstant.GET_COMMENTS):
    case REQUEST(commentConstant.GET_RECENT_COMMENTS):
      return {
        ...state,
        isLoading: true,
        isError: false,
        comments: []
      };
    case SUCCESS(commentConstant.GET_COMMENTS):
    case SUCCESS(commentConstant.GET_RECENT_COMMENTS):
      return {
        ...state,
        isLoading: false,
        isError: false,
        comments: payload?.response
      };
    case FAILURE(commentConstant.GET_COMMENTS):
    case FAILURE(commentConstant.GET_RECENT_COMMENTS):
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case SUCCESS(commentConstant.CREATE_COMMENT):
      return {
        ...state,
        isLoading: false,
        isError: false,
        comments: [
          payload?.response,
          ...state.comments,
        ]
      };
    default:
      return state;
  }
};

export default reducer;
