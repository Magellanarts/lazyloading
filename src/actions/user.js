/* eslint-disable no-restricted-syntax */
import firebase from 'firebase/app';
import 'firebase/storage';
import store from '@/store/store';

import { db } from '@/auth';
import router from '@/router';


// Sign up user account
// On Success, create user in users list too
export const SIGN_UP_USER = (user) => {
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
};

// Log user into their account
// On Success, take them to dashboard
export const LOG_IN_USER = (user) => {
  firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(() => {
      router.push('/dashboard/user');
    })
    .catch((err) => {
      // TODO: Error Handling
      console.log(err);
    });
};

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


export const ADD_RENTAL_TO_USER = (rental, user) => {
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
