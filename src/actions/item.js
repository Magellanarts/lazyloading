import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';

import { db, updateAlgolia } from '@/auth';


export const GET_ITEM_DATA_BY_DOC_ID = itemRef => new Promise((resolve, reject) => {
  // After sync, set the item's main image into separate mainIMage var in store
  db.collection('items').doc(itemRef).get()
    .then(doc => resolve(doc.data()));
});

export const GET_ITEM_DATA_BY_NAME = itemRef => new Promise((resolve, reject) => {
  db.collection('items').where('slug', '==', itemRef).limit(1).get()
    .then((doc) => {
      // id of item we need is doc.docs[0].id
      GET_ITEM_DATA_BY_DOC_ID(doc.docs[0].id).then(res => resolve(res));
    });
});
