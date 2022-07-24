import {Action} from "../../types";
import {FAILURE, notificationConstant, REQUEST, SUCCESS} from "../constants";


const initialState = {
    isLoading: false,
    isError: false,
    notifications: [],
};
const reducer = (state = initialState, action: Action) => {
    const {payload, error} = action;
    switch (action.type) {
        case REQUEST(notificationConstant.GET_COMMENTS_FOR_NOTIFICATION):
            return {
                ...state,
                isLoading: true,
                isError: false,
                notifications: []
            };
        case SUCCESS(notificationConstant.GET_COMMENTS_FOR_NOTIFICATION):
            return {
                ...state,
                isLoading: false,
                isError: false,
                notifications: payload
            };
        case FAILURE(notificationConstant.GET_COMMENTS_FOR_NOTIFICATION):
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            return state;
    }
}

export default reducer;