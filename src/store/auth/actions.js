import { db } from '@/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  SIGN_UP_USER,
  LOG_IN_USER,
  GET_USER_DETAILS,
  MUTATE_USER_DETAILS,
  GET_USER_ITEMS,
  MUTATE_USER_ITEMS,
  LOG_OUT_USER,
  MUTATE_USER_ID,
  SET_USER_ID,
  GET_USER_ID,
  GET_USER_ADDRESSES,
  MUTATE_USER_ADDRESSES,
} from '../types';

import router from '@/router';

export default {
  // Sign up user account
  // On Success, create user in users list too
  [SIGN_UP_USER]: ({ commit }, user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        // uid is res.user.uid
        // add user to users collection in firestore
        db.collection('users').doc(res.user.uid).set({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
        router.push('/dashboard');
      })
      .catch((err) => {
        // TODO: Error handling
        // If failed, handle error
        // Probably because email is already in use as account
        console.log(err);
      });
  },
  // Log user into their account
  // On Success, take them to dashboard
  [LOG_IN_USER]: ({ commit }, user) => {
    firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        router.push('/dashboard');
      })
      .catch((err) => {
        // TODO: Error Handling
        console.log(err);
      });
  },
  [GET_USER_DETAILS]: ({ commit, getters }) => new Promise((resolve) => {
    db.collection('users').doc(getters.userId).get()
      .then((res) => {
        commit(MUTATE_USER_DETAILS, res.data());
        resolve(res.data());
      });
  }),
  [GET_USER_ID]: ({ getters }) => new Promise((resolve) => {
    console.log(getters.userId);
    resolve(getters.userId);
  }),
  [GET_USER_ITEMS]: ({ commit, getters }) => {
    const { user } = getters;
    if (user) {
      // eslint-disable-next-line no-restricted-syntax
      if (user.items) {
        for (const item of user.items) {
          db.collection('items').doc(item).get()
            .then((res) => {
              const itemData = res.data();
              itemData.ID = item;
              commit(MUTATE_USER_ITEMS, itemData);
            });
        }
      }
    }
  },
  [GET_USER_ADDRESSES]: ({ commit, getters }) => {
    const { user } = getters;
    if (user) {
      // eslint-disable-next-line no-restricted-syntax
      if (user.addresses) {
        for (const address of user.addresses) {
          db.collection('addresses').doc(address).get()
            .then((res) => {
              const addressData = res.data();
              addressData.ID = address;
              commit(MUTATE_USER_ADDRESSES, addressData);
            });
        }
      }
    }
  },
  // Log out user account
  // On Success, clear user info in store and send them to Home
  [LOG_OUT_USER]: ({ commit }) => {
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
};
