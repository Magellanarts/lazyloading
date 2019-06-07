/* eslint-disable no-restricted-syntax */
import firebase from 'firebase/app';
import 'firebase/storage';
import store from '@/store/store';

import { db } from '@/auth';
import router from '@/router';


// Sign up user account
// On Success, create user in users list too
// PARAMS:
//    user:
//      user object
export const SIGN_UP_USER = (user) => {
  // call to firebase to create user with this email and password
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
// PARAMS:
//    user:
//      user object
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
// Get addresses for current user
// PARAMS: NONE
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

// Get conversations for current user
// PARAMS: NONE
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

export const GET_USER_NAME = () => new Promise((resolve) => {
  const { userId } = store.getters;

  db.collection('users').doc(userId).get()
    .then((userData) => {
      resolve({
        first: userData.data().firstName,
        last: userData.data().lastName,
      });
    });
});

// Get conversations for current user
// PARAMS: NONE
export const GET_USER_RENTALS = () => new Promise((resolve) => {
  const { userId } = store.getters;
  const rentals = [];

  db.collection('users').doc(userId).get()
    .then((userData) => {
      for (const rental of userData.data().rentals) {
        db.collection('rentals').doc(rental).get()
          .then((res) => {
            const rentalInfo = res.data();
            rentals.push(rentalInfo);
            resolve(rentals);
          });
      }
    });
});

// Add a rental transaction to a user in firebase
// PARAMS:
//    rentalId:
//      id of rental transaction
//    userId:
//      id of user to add rental transaction to
//      can't grab current user's id because this is also used to add rental to owner's table
export const ADD_RENTAL_TO_USER = (rentalId, userId) => {
  db.collection('users').doc(userId)
    .update({
      rentals: firebase.firestore.FieldValue.arrayUnion(rentalId),
    });
};

// Add a review transaction to user in firebase
// PARAMS:
//    reviewId:
//      id of review transaction
//    userId:
//      id of user to add rental transaction to
//      can't grab current user's id because this is also used to add rental to owner's table
export const ADD_REVIEW_TO_USER = (reviewId, userId) => {
  db.collection('users').doc(userId)
    .update({
      reviews: firebase.firestore.FieldValue.arrayUnion(reviewId),
    });
};

// Add conversation to current user
// PARAMS:
//    conversationId:
//      id of conversation
//    userId:
//      id of user this conversation is being added to
//    partnerId:
//      id of other user in this conversation
export const ADD_CONVO_TO_USER = (conversationId, userId, partnerId) => {
  const conversation = {
    conversationId,
    userId,
    partnerId,
  };

  db.collection('users').doc(userId)
    .update({
      conversations: firebase.firestore.FieldValue.arrayUnion(conversation),
    });
};
