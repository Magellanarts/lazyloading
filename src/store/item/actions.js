/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';

import { db, updateAlgolia } from '@/auth';
import { slugify } from '@/mixins';
import {
  UPDATE_ITEM,
  CREATE_ITEM,
  UPDATE_MAIN_IMAGE,
  MUTATE_MAIN_IMAGE,
  GET_ITEM_DATA_BY_DOC_ID,
  MUTATE_ITEM,
  SET_ITEM_DETAILS,
  GET_ITEM_DATA_BY_NAME,
} from '../types';


export default {
  [UPDATE_ITEM]: ({}, item) => {
    const storageRef = firebase.storage().ref();
    const itemToPublish = { ...item };
    // set up tags
    itemToPublish.tags = {};
    for (const tag of item.tagsSearchbale) {
      itemToPublish.tags[tag] = true;
    }

    // create slug
    if (!itemToPublish.slug) {
      itemToPublish.slug = slugify.sanitizeTitle(`${itemToPublish.name} ${itemToPublish.city} ${itemToPublish.state}`);
    }


    if (item.mainImage) {
      if (item.mainImage.constructor === FileList) {
      // mainImage has changed, we need to upload it
        const mainImage = item.mainImage[0];
        itemToPublish.mainImage = `${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`;
        storageRef.child(`${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`).put(mainImage);
      }
    }


    if (item.otherImages) {
      item.otherImages.forEach((photo, index) => {
        if (photo.constructor === FileList) {
          const photoDetails = photo[0];
          itemToPublish.otherImages[index] = `${photoDetails.lastModified}-${photoDetails.size}-${photoDetails.name}`;

          storageRef.child(`${photoDetails.lastModified}-${photoDetails.size}-${photoDetails.name}`).put(photo[0]);
        }
      });
    }
    if (!itemToPublish._geoloc) {
      axios.get(`https://open.mapquestapi.com/nominatim/v1/search.php?key=WWoKqSLir2hzGkpTBhbJbFXeyC8Gz96S&format=json&q=${itemToPublish.streetAddress} ${itemToPublish.city}, ${itemToPublish.state}`)
        .then((res) => {
          itemToPublish._geoloc = {
            lat: parseFloat(res.data[0].lat),
            lng: parseFloat(res.data[0].lon),
          };
          db.collection('items').doc(itemToPublish.ID)
            .update(itemToPublish).then(() => {
              itemToPublish.objectID = itemToPublish.ID;
              updateAlgolia(itemToPublish);
            });
        });
    } else {
      db.collection('items').doc(itemToPublish.ID)
        .update(itemToPublish).then(() => {
          itemToPublish.objectID = itemToPublish.ID;
          updateAlgolia(itemToPublish);
        });
    }
  },
  // Create a new item
  [CREATE_ITEM]: ({ getters }, item) => {
    // Upload images to firestore
    const storageRef = firebase.storage().ref();

    // copy item object so we can reassign some values
    const itemToPublish = { ...item };

    // set the user to the userID we get from our getters
    itemToPublish.user = getters.userId;

    // clear out otherImages as we'll reassigning them with just the name value
    itemToPublish.otherImages = [];

    // Main image First
    if (item.mainImage) {
      const mainImage = item.mainImage[0];
      itemToPublish.mainImage = `${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`;
      storageRef.child(`${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`).put(mainImage);
    }

    // Secondary Images
    if (item.otherImages) {
      for (const photo of item.otherImages) {
        itemToPublish.otherImages.push(`${photo.lastModified}-${photo.size}-${photo.name}`);

        storageRef.child(`${photo.lastModified}-${photo.size}-${photo.name}`).put(photo);
      }
    }

    // set up tags
    if (item.tagsSearchbale) {
      itemToPublish.tags = {};
      for (const tag of item.tagsSearchbale) {
        itemToPublish.tags[tag] = true;
      }
    }

    // create slug
    itemToPublish.slug = slugify.sanitizeTitle(`${itemToPublish.name} ${itemToPublish.city} ${itemToPublish.state}`);

    axios.get(`https://open.mapquestapi.com/nominatim/v1/search.php?key=WWoKqSLir2hzGkpTBhbJbFXeyC8Gz96S&format=json&q=${itemToPublish.streetAddress} ${itemToPublish.city}, ${itemToPublish.state}`)
      .then((response) => {
        itemToPublish._geoloc = {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon),
        };
        // push to firestore
        db.collection('items').add(itemToPublish)
          .then((res) => {
            // res.id has the id to add to user's item array
            db.collection('users').doc(itemToPublish.user)
              .update({
                items: firebase.firestore.FieldValue.arrayUnion(res.id),
              });

            // update algolia
            itemToPublish.objectID = itemToPublish.ID;
            updateAlgolia(itemToPublish);
          });
      });
  },
  // Update main image on item page
  // Used for switching between thumbnails
  [UPDATE_MAIN_IMAGE]: ({ commit }, payload) => {
    commit(MUTATE_MAIN_IMAGE, payload);
  },
  // Sync curItem in store to item from Firebase
  [GET_ITEM_DATA_BY_DOC_ID]: ({ commit }, itemRef) => new Promise((resolve, reject) => {
    // After sync, set the item's main image into separate mainIMage var in store
    db.collection('items').doc(itemRef).get()
      .then((doc) => {
        commit(MUTATE_ITEM, doc.data());
        commit(MUTATE_MAIN_IMAGE, doc.data().mainImage);
        resolve(doc.data());
      });
  }),
  [SET_ITEM_DETAILS]: ({ commit }, item) => {
    commit(MUTATE_ITEM, item);
  },
  // Search for item in collection by slug
  // This is used when someone directly accesses an item page rather than coming via a
  // link that includes the doc ID (such as the tags list or search list)
  [GET_ITEM_DATA_BY_NAME]: ({ dispatch }, itemRef) => new Promise((resolve, reject) => {
    db.collection('items').where('slug', '==', itemRef).limit(1).get()
      .then((doc) => {
        // id of item we need is doc.docs[0].id
        dispatch(GET_ITEM_DATA_BY_DOC_ID, doc.docs[0].id).then((res) => {
          resolve(res);
        });
      });
  }),
};
