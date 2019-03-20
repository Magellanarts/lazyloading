import Vue from 'vue';
import VueFire from 'vuefire';

import store from '@/store/store';
import { SET_USER } from '@/store/types';

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
});


// When a user logs in or out, update the user info in store
// TODO: may need to research to see if this is best way to handle this.
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // set user in store
    store.dispatch(SET_USER, user);
  } else {
    // no user logged in
  }
});

export const db = firebase.firestore();

// Initialize Algolia search info
const algolia = algoliasearch(
  '9AURVLYOP7',
  '94f720be87cbb56ec79609495979cad9',
);

const index = algolia.initIndex('items');


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
      console.log(doc.id, '=>', doc.data());
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
