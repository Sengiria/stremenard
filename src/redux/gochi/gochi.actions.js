import GochiActionTypes from "./gochi.types";

export const setCurrentAnimation = anim => ({
    type: GochiActionTypes.SET_CURRENT_ANIMATION,
    payload: anim
})

export const toggleItemVisible = () => ({
    type: GochiActionTypes.TOGGLE_ITEM_VISIBLE
})

export const toggleAsleep = () => ({
    type: GochiActionTypes.TOGGLE_ASLEEP
})

export const setCurrentItem = item => ({
    type: GochiActionTypes.SET_CURRENT_ITEM,
    payload: item
})


