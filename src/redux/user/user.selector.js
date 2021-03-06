import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectHasAccount = createSelector(
  [selectUser],
  user => user.hasAccount
);


export const selectError = createSelector(
  [selectUser],
  user => user.error
);

