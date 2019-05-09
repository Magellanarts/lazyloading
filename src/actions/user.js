/* eslint-disable no-restricted-syntax */
import firebase from 'firebase/app';
import 'firebase/storage';
import store from '@/store/store';

import { db } from '@/auth';


// eslint-disable-next-line import/prefer-default-export
export const GET_USER_ADDRESSES = () => new Promise((resolve) => {
  const { userId } = store.getters;
  const addresses = [];

  db.collection('users').doc(userId).get()
    .then((userData) => {
      for (const address of userData.data().addresses) {
        db.collection('addresses').doc(address).get()
          .then((res) => {
            const addressData = res.data();
            addressData.ID = address;
            addresses.push(addressData);
            resolve(addresses);
          });
      }
    });
});


export const GET_USER_CONVERSATIONS = () => new Promise((resolve) => {
  const { userId } = store.getters;

  const convos = [];

  db.collection('users').doc(userId).get()
    .then((userData) => {
      for (const convo of userData.data().conversations) {
        db.collection('conversations').doc(convo.conversationId).get()
          .then((res) => {
            const conversation = res.data();
            convos.push(conversation);
            resolve(convos);
          });
      }
    });
});


export const ADD_RENTAL = (rental, user) => {
  db.collection('users').doc(user)
    .update({
      rentals: firebase.firestore.FieldValue.arrayUnion(rental),
    });
};

export const ADD_CONVO_TO_USER = (convo, userId, partnerId) => {
  const conversation = {
    conversationId: convo,
    userId,
    partnerId,
  };

  db.collection('users').doc(userId)
    .update({
      conversations: firebase.firestore.FieldValue.arrayUnion(conversation),
    });
};
// TODO: once rental is complete, check to see if we need to create a new convo
// or add to existing convo]
