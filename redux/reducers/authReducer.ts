import { Action } from 'types/action';
import { authConstants } from '../constants/auth';
import { FAILURE, REQUEST, SUCCESS } from '../constants';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  isLoading: false,
  isGettingMe: false,
  isError: false,
  error: {},
  type: '',
  user: {},
};

const reducer = (state = initialState, action: Action | any) => {
  const { payload, error } = action;
  switch (action.type) {
    case HYDRATE: {
      const { user } = payload.authReducer;
      const { user: userState } = state;
      return {
        ...state,
        user: user?.id ? user : userState,
      };
    }
    case REQUEST(authConstants.LOGIN):
      return {
        ...state,
        isLoading: true,
        type: action.type,
        messageError: '',
      };
    case SUCCESS(authConstants.LOGIN):
      return {
        ...state,
        isLoading: false,
        user: payload?.response,
      };
    case FAILURE(authConstants.LOGIN):
      return {
        ...state,
        isLoading: false,
        isError: true,
        user: {},
        error,
      };
    case REQUEST(authConstants.LOGIN_WITH_GOOGLE):
      return {
        ...state,
        isLoading: true,
        type: action.type,
        messageError: '',
      };
    case SUCCESS(authConstants.LOGIN_WITH_GOOGLE):
      return {
        ...state,
        isLoading: false,
        user: payload?.response,
      };
    case FAILURE(authConstants.LOGIN_WITH_GOOGLE):
      return {
        ...state,
        isLoading: false,
        isError: true,
        user: {},
        error,
      };
    case REQUEST(authConstants.REGISTER):
      return {
        ...state,
        isLoading: true,
        messageError: '',
      };
    case SUCCESS(authConstants.REGISTER):
      return {
        ...state,
        isLoading: false,
      };
    case FAILURE(authConstants.REGISTER):
      return {
        ...state,
        isLoading: false,
        isError: true,
        error,
      };
    case REQUEST(authConstants.GET_ME):
      return {
        ...state,
        isGettingMe: true,
        user: {}
      };
    case SUCCESS(authConstants.GET_ME):
      return {
        ...state,
        isGettingMe: false,
        user: payload
      };
    case FAILURE(authConstants.GET_ME):
      return {
        ...state,
        isGettingMe: false,
        isError: true,
        user: {},
        error,
      };
    case REQUEST(authConstants.LOGOUT):
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
};

export default reducer;
