import { createSelector } from 'reselect';

const selectGochi = state => state.gochi;

export const selectCurrentAnimation = createSelector(
  [selectGochi],
  gochi => gochi.currentAnimation
);

export const selectItemVisible = createSelector(
  [selectGochi],
  gochi => gochi.itemVisible
);

export const selectPoopVisible = createSelector(
  [selectGochi],
  gochi => gochi.poopVisible
);

export const selectNeedVisible = createSelector(
  [selectGochi],
  gochi => gochi.needVisible
);

export const selectAsleep = createSelector(
  [selectGochi],
  gochi => gochi.asleep
);

export const selectCurrentItem = createSelector(
  [selectGochi],
  gochi => gochi.currentItem
);






