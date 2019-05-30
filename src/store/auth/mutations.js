/* eslint no-param-reassign: [2, { "props": false }] */
import {
  MUTATE_USER_DETAILS, MUTATE_USER_ID, MUTATE_USER_ITEMS, MUTATE_USER_ADDRESSES, MUTATE_USER_EMAIL,
} from '../types';

export default {
  // Update user info in store
  [MUTATE_USER_ID]: (state, userId) => {
    state.userId = userId;

    // store userId in localstorage
    localStorage.setItem('userId', userId);
  },
  [MUTATE_USER_EMAIL]: (state, userEmail) => {
    state.userEmail = userEmail;
  },
  [MUTATE_USER_DETAILS]: (state, user) => {
    state.user = user;
  },
  [MUTATE_USER_ITEMS]: (state, item) => {
    state.userItems.push(item);
  },
  [MUTATE_USER_ADDRESSES]: (state, address) => {
    state.userAddresses.push(address);
  },
};
