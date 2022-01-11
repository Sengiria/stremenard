import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    hasAccount: true,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case UserActionTypes.TOGGLE_HAS_ACCOUNT:
            return {
                ...state,
                hasAccount: !state.hasAccount
            }
            case UserActionTypes.SET_CURRENT_USER:
                return {
                    ...state,
                    currentUser: action.payload
                }
        default:
            return state;
    }
}

export default userReducer;
