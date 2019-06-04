import Vue from 'vue';
import VueFire from 'vuefire';

import store from '@/store/store';
import {
  SET_USER_ID,
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
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  storageBucket: 'lazyloading-c3f8a.appspot.com',
});

export function getUserID(user) {
  if (user.uid) {
    localStorage.setItem('userId', user.uid);
    store.dispatch(SET_USER_ID, user.uid);
    store.dispatch(SET_USER_EMAIL, user.email);
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
export const algolia = algoliasearch(
  process.env.VUE_APP_ALGOLIA_APP_ID,
  process.env.VUE_APP_ALGOLIA_API_KEY,
);

const index = algolia.initIndex('items');

export const updateAlgolia = (item) => {
  index.saveObject(item).then(() => {
    console.log('Documents imported into Algolia');
    process.exit(0);
  });
};
