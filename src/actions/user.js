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
      // eslint-disable-next-line no-restricted-syntax
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


export const ADD_RENTAL = (rental, user) => {
  db.collection('users').doc(user)
    .update({
      rentals: firebase.firestore.FieldValue.arrayUnion(rental),
    });
};
