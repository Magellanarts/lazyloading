/* eslint no-param-reassign: [2, { "props": false }] */
import { MUTATE_USER_DETAILS, MUTATE_USER_ID, MUTATE_USER_ITEMS } from '../types';

export default {
  // Update user info in store
  [MUTATE_USER_ID]: (state, userId) => {
    state.userId = userId;

    // store userId in localstorage
    localStorage.setItem('userId', userId);
  },
  [MUTATE_USER_DETAILS]: (state, user) => {
    state.user = user;
  },
  [MUTATE_USER_ITEMS]: (state, item) => {
    state.userItems.push(item);
  },
};
