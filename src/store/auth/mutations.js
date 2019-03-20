/* eslint no-param-reassign: [2, { "props": false }] */
import * as types from '../types';

export default {
  // Update user info in store
  [types.MUTATE_USER]: (state, user) => {
    state.user = user;
    state.userId = user.uid;

    // store userId in localstorage
    localStorage.setItem('userId', user.uid);
  },
};
