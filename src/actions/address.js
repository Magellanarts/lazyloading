import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';
import { db } from '@/auth';


export const UPDATE_ADDRESS = (address) => {
  db.collection('addresses').doc(address.id)
    .update(address);
};

export const CREATE_ADDRESS = (address) => {
  const addressToPublish = { ...address };
  axios.get(`https://open.mapquestapi.com/nominatim/v1/search.php?key=WWoKqSLir2hzGkpTBhbJbFXeyC8Gz96S&format=json&q=${address.streetAddress} ${address.city}, ${address.state}`)
    .then((response) => {
      addressToPublish._geoloc = {
        lat: parseFloat(response.data[0].lat),
        lng: parseFloat(response.data[0].lon),
      };

      db.collection('addresses').add(addressToPublish)
        .then((res) => {
          db.collection('users').doc(address.user)
            .update({
              addresses: firebase.firestore.FieldValue.arrayUnion(res.id),
            });
        });
    });
};

export const GET_ADDRESS = id => new Promise((resolve) => {
  db.collection('addresses').doc(id).get()
    .then(doc => resolve(doc.data()));
});
