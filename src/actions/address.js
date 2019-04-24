import firebase from 'firebase/app';
import 'firebase/storage';

import { db } from '@/auth';


export const UPDATE_ADDRESS = (address) => {
  db.collection('addresses').doc(address.id)
    .update(address);
};

export const CREATE_ADDRESS = (address) => {
  db.collection('addresses').add(address)
    .then((res) => {
      db.collection('users').doc(address.user)
        .update({
          addresses: firebase.firestore.FieldValue.arrayUnion(res.id),
        });
    });
};

export const GET_ADDRESS = id => new Promise((resolve) => {
  db.collection('addresses').doc(id).get()
    .then(doc => resolve(doc.data()));
});
