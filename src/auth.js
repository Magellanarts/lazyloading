import Vue from 'vue';
import VueFire from 'vuefire';

import store from '@/store/store';
import { SET_USER_ID, GET_USER_DETAILS } from '@/store/types';

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

export function getUserDetails(user) {
  store.dispatch(SET_USER_ID, user.uid);
  // store.dispatch(GET_USER_DETAILS);
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // set user in store
    getUserDetails(user);
  } else {
    // no user logged in
  }
});


export const db = firebase.firestore();

// Initialize Algolia search info
const algolia = algoliasearch(
  '9AURVLYOP7',
  '99e4ec81fd5a69e533c04ecc64dccd57',
);

const index = algolia.initIndex('items');

if ('geolocation' in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition((position) => {
  // do_something(position.coords.latitude, position.coords.longitude);
    localStorage.setItem('lat', position.coords.latitude);
    localStorage.setItem('lon', position.coords.longitude);
  });
} else {
  /* geolocation IS NOT available */
}


export const updateAlgolia = (item) => {
  index.saveObject(item).then(() => {
    console.log('Documents imported into Algolia');
    process.exit(0);
  });
};

/*
// This was set up to get the existing items from firestore into Algolia
const records = [];

db.collection('items').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const childKey = doc.id;
      const childData = doc.data();

      childData.objectID = childKey;

      records.push(childData);
    });

    // Add or update new objects
    index.saveObjects(records).then(() => {
      console.log('Documents imported into Algolia');
      process.exit(0);
    })
      .catch((error) => {
        console.error('Error when importing documents into Algolia', error);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error('Error getting documents', err);
  });
  */
