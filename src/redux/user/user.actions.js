import UserActionTypes from "./user.types";

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})

export const toggleHasAccount = () => ({
    type: UserActionTypes.TOGGLE_HAS_ACCOUNT
})