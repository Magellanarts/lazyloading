/* eslint no-param-reassign: [2, { "props": false }] */
import * as types from '../types';

export default {
  // Update user info in store
  [types.MUTATE_USER_ID]: (state, userId) => {
    state.userId = userId;

    // store userId in localstorage
    localStorage.setItem('userId', userId);
  },
  [types.MUTATE_USER_DETAILS]: (state, user) => {
    state.user = user;
  },
  [types.MUTATE_USER_ITEMS]: (state, item) => {
    state.userItems.push(item);
  },
};
