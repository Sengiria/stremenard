import GochiActionTypes from "./gochi.types";

const INITIAL_STATE = {
    currentAnimation: 'walk',
    itemVisible: false,
    poopVisible: false,
    needVisible: false,
    currentItem: '',
    asleep: false,
    need: ''
}

const gochiReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GochiActionTypes.SET_CURRENT_ANIMATION:
            return {
                ...state,
                currentAnimation: action.payload
            }
        case GochiActionTypes.TOGGLE_ITEM_VISIBLE:
            return {
                ...state,
                itemVisible: !state.itemVisible
            }
        case GochiActionTypes.TOGGLE_POOP_VISIBLE:
            return {
                ...state,
                poopVisible: !state.poopVisible
            }
        case GochiActionTypes.TOGGLE_ASLEEP:
            return {
                ...state,
                asleep: !state.asleep
            }
        case GochiActionTypes.TOGGLE_NEED_VISIBLE:
            return {
                ...state,
                needVisible: !state.needVisible
            }
        case GochiActionTypes.SET_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload
            }
        case GochiActionTypes.SET_NEED:
            return {
                ...state,
                need: action.payload
            }
        default:
            return state;
    }
}

export default gochiReducer;
