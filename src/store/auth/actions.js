import { db } from '@/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  GET_USER_DETAILS,
  MUTATE_USER_DETAILS,
  GET_USER_ITEMS,
  MUTATE_USER_ITEMS,
  STORE_LOG_OUT_USER,
  MUTATE_USER_ID,
  MUTATE_USER_EMAIL,
  SET_USER_ID,
  SET_USER_EMAIL,
  GET_USER_ID,
  GET_USER_ADDRESSES,
  MUTATE_USER_ADDRESSES,
} from '../types';

import router from '@/router';

export default {
  [GET_USER_DETAILS]: ({ commit, getters }) => new Promise((resolve) => {
    db.collection('users').doc(getters.userId).get()
      .then((res) => {
        commit(MUTATE_USER_DETAILS, res.data());
        resolve(res.data());
      });
  }),
  [GET_USER_ID]: ({ getters }) => new Promise((resolve) => {
    resolve(getters.userId);
  }),
  [GET_USER_ITEMS]: ({ commit, getters }) => {
    const { user } = getters;
    if (user) {
      if (user.items) {
        // Object.keys(user.items).forEach(key => {
        // user.items.forEeach((item) => {
        Object.keys(user.items).forEach((item) => {
          db.collection('items').doc(user.items[item]).get()
            .then((res) => {
              const itemData = res.data();
              itemData.ID = user.items[item];
              commit(MUTATE_USER_ITEMS, itemData);
            });
        });
      }
    }
  },
  [GET_USER_ADDRESSES]: ({ commit, getters }) => {
    const { user } = getters;
    if (user) {
      if (user.addresses) {
        // user.addresses.forEach((address) => {
        Object.keys(user.addresses).forEach((address) => {
          db.collection('addresses').doc(user.addresses[address]).get()
            .then((res) => {
              const addressData = res.data();
              addressData.ID = user.addresses[address];
              commit(MUTATE_USER_ADDRESSES, addressData);
            });
        });
      }
    }
  },
  // Log out user account
  // On Success, clear user info in store and send them to Home
  [STORE_LOG_OUT_USER]: ({ commit }) => {
    firebase.auth()
      .signOut()
      .then(() => {
        commit(MUTATE_USER_ID, '');
        // move user back to home
        router.push('/');
      });
  },
  // Update user info in store
  [SET_USER_ID]: ({ commit }, userId) => {
    commit(MUTATE_USER_ID, userId);
  },
  [SET_USER_EMAIL]: ({ commit }, userEmail) => {
    commit(MUTATE_USER_EMAIL, userEmail);
  },
};
