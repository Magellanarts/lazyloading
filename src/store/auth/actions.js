import { db } from '@/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as types from '../types';

import router from '@/router';

export default {
  // Sign up user account
  // On Success, create user in users list too
  [types.SIGN_UP_USER]: (user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        // uid is res.user.uid
        // add user to users collection in firestore
        db.collection('users').doc(res.user.uid).set({
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          email: user.email,
        });
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
  [types.LOG_IN_USER]: (user) => {
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
  // Log out user account
  // On Success, clear user info in store and send them to Home
  [types.LOG_OUT_USER]: ({ commit }) => {
    firebase.auth()
      .signOut()
      .then(() => {
        commit(types.MUTATE_USER, {
          user: false,
          userId: '',
        });
        // move user back to home
        router.push('/');
      });
  },
  // Update user info in store
  [types.SET_USER]: ({ commit }, user) => {
    commit(types.MUTATE_USER, user);
  },
};
