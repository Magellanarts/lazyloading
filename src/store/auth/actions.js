import { db } from '@/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as types from '../types';

import router from '@/router';

export default {
  [types.SIGN_UP_USER]: ({ commit }, user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        /*
        res.user.getIdToken().then((token) => {
          console.log(`my token: ${token}`);
        });
        */

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
        console.log(err);
      });
  },
  [types.LOG_IN_USER]: ({ commit }, user) => {
    firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        router.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  },
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
  [types.SET_USER]: ({ commit }, user) => {
    commit(types.MUTATE_USER, user);
  },
};
