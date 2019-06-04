/* eslint-disable no-underscore-dangle */
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';
import { db } from '@/auth';

// Edit an address
// Can create a new address or edit an existing
// PARAMS:
//    address:
//      address object
//    newAddress:
//      Boolean of whether this is a new or old address
export const EDIT_ADDRESS = (address, newAddress) => {
  // make copy of address object so we can edit its fields
  const addressToPublish = { ...address };

  // make call to mapquest API to get lat/lon values
  axios.get(`https://open.mapquestapi.com/nominatim/v1/search.php?key=WWoKqSLir2hzGkpTBhbJbFXeyC8Gz96S&format=json&q=${addressToPublish.streetAddress} ${addressToPublish.city}, ${addressToPublish.state}`)
    .then((response) => {
      // store lat/lon values in _geoloc
      // _geoloc is the required name for Algolia search
      addressToPublish._geoloc = {
        lat: parseFloat(response.data[0].lat),
        lng: parseFloat(response.data[0].lon),
      };
    });

  // check passed in newAddress parameter
  // if true:
  //    Need to add this address object to firestore
  //    Also, add it to User's array of addresses
  if (newAddress) {
    db.collection('addresses').add(addressToPublish)
      .then((res) => {
        db.collection('users').doc(addressToPublish.user)
          .update({
            addresses: firebase.firestore.FieldValue.arrayUnion(res.id),
          });
      });
  } else {
    // editing an existing address.
    // just need to update the address info in firestore
    db.collection('addresses').doc(addressToPublish.id)
      .update(addressToPublish);
  }
};

// get an address object by address id
// PARAMS:
//    id:
//      id of address to get
export const GET_ADDRESS = id => new Promise((resolve) => {
  db.collection('addresses').doc(id).get()
    .then(doc => resolve(doc.data()));
});
