import { Action } from 'types/action';
import { discussConstant } from '../constants/discussConstant';
import { FAILURE, REQUEST, SUCCESS } from '../constants';

const initialState = {
  isLoading: false,
  isError: false,
  discuss: [],
  detailDiscuss: {}
};

const reducer = (state = initialState, action: Action) => {
  const { payload, error } = action;
  switch (action.type) {
    case REQUEST(discussConstant.CREATE_DISUCSS):
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case SUCCESS(discussConstant.CREATE_DISUCSS):
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    case FAILURE(discussConstant.CREATE_DISUCSS):
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REQUEST(discussConstant.GET_OWN_DISCUSS):
    case REQUEST(discussConstant.GET_ALL_DISCUSS):
    case REQUEST(discussConstant.GET_DISCUSS_By_STORY):
      return {
        ...state,
        isLoading: true,
        isError: false,
        discuss: []
      };
    case SUCCESS(discussConstant.GET_OWN_DISCUSS):
    case SUCCESS(discussConstant.GET_ALL_DISCUSS):
    case SUCCESS(discussConstant.GET_DISCUSS_By_STORY):
      return {
        ...state,
        isLoading: false,
        isError: false,
        discuss: payload?.response || []
      };
    case FAILURE(discussConstant.GET_OWN_DISCUSS):
    case FAILURE(discussConstant.GET_ALL_DISCUSS):
    case FAILURE(discussConstant.GET_DISCUSS_By_STORY):
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REQUEST(discussConstant.GET_DISCUSS_ID):
      return {
        ...state,
        isLoading: true,
        isError: false,
        detailDiscuss: {}
      };
    case SUCCESS(discussConstant.GET_DISCUSS_ID):
      return {
        ...state,
        isLoading: false,
        isError: false,
        detailDiscuss: payload?.response || {}
      };
    case FAILURE(discussConstant.GET_DISCUSS_ID):
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REQUEST(discussConstant.DELETE_DISCUSS): {
      const idIndex = state.discuss.findIndex((item: any) => item.id === payload?.params?.id);
      if (idIndex !== -1) {
        state.discuss.splice(idIndex, 1);
      }

      return {
        ...state,
        discuss: [...state.discuss],
      };
    }
    default:
      return state;
  }
};

export default reducer;
