import Vue from 'vue';
import VueFire from 'vuefire';

import store from '@/store/store';
import {
  SET_USER_ID,
  GET_USER_DETAILS,
  SET_USER_EMAIL,
} from '@/store/types';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import algoliasearch from 'algoliasearch';

Vue.use(VueFire);

// Initialize firebase info
firebase.initializeApp({
  projectId: 'lazyloading-c3f8a',
  databaseURL: 'https://lazyloading-c3f8a.firebaseio.com',
  apiKey: 'AIzaSyCQb0GOSMlEM5RiQKVebLiQVENziV61JfQ',
  storageBucket: 'lazyloading-c3f8a.appspot.com',
});

export function getUserID(user) {
  if (user.uid) {
    localStorage.setItem('userId', user.uid);
    store.dispatch(SET_USER_ID, user.uid);
    store.dispatch(SET_USER_EMAIL, user.email);
    store.dispatch(GET_USER_DETAILS, user.uid);
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // set user in store
    getUserID(user);
  } else {
    // no user logged in
    getUserID({ uid: '' });
  }
});


export const db = firebase.firestore();

// Initialize Algolia search info
const algolia = algoliasearch(
  '9AURVLYOP7',
  '99e4ec81fd5a69e533c04ecc64dccd57',
);

const index = algolia.initIndex('items');

export const updateAlgolia = (item) => {
  index.saveObject(item).then(() => {
    console.log('Documents imported into Algolia');
    process.exit(0);
  });
};
