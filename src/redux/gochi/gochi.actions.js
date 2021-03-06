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

export const togglePoopVisible = () => ({
    type: GochiActionTypes.TOGGLE_POOP_VISIBLE
})

export const toggleNeedVisible = () => ({
    type: GochiActionTypes.TOGGLE_NEED_VISIBLE
})

export const setCurrentItem = item => ({
    type: GochiActionTypes.SET_CURRENT_ITEM,
    payload: item
})

export const setNeed = need => ({
    type: GochiActionTypes.SET_NEED,
    payload: need
})


