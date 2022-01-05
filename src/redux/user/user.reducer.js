import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    hasAccount: true,

}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.TOGGLE_HAS_ACCOUNT:
            return {
                ...state,
                hasAccount: !state.hasAccount
            }
        default:
            return state;
    }
}

export default userReducer;
