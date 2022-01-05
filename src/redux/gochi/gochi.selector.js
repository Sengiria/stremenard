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

export const selectCurrentItem = createSelector(
  [selectGochi],
  gochi => gochi.currentItem
);






