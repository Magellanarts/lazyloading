import firebase from 'firebase/app';
import 'firebase/storage';
import { slugify } from '@/mixins';
import store from '@/store/store';

import { db, updateAlgolia } from '@/auth';

// reference to firebase storage
const storageRef = firebase.storage().ref();

// Get item information by Id
// PARAMS:
//    itemId:
//      id of item to get
export const GET_ITEM_DATA_BY_DOC_ID = itemId => new Promise((resolve) => {
  // After sync, set the item's main image into separate mainIMage var in store
  db.collection('items').doc(itemId).get()
    .then(doc => resolve(doc.data()));
});

// Get item information by slug
// PARAMS:
//    slug:
//      slug of item to get
export const GET_ITEM_DATA_BY_NAME = slug => new Promise((resolve) => {
  db.collection('items').where('slug', '==', slug).limit(1).get()
    .then((doc) => {
      // id of item we need is doc.docs[0].id
      GET_ITEM_DATA_BY_DOC_ID(doc.docs[0].id).then(res => resolve(res));
    });
});

// Edit an item's data
// Can edit an existing item or create a new one
// PARAMS:
//    item:
//      item object
export const EDIT_ITEM = (item) => {
  // copy item object so we can reassign some values
  const itemToPublish = { ...item };

  // get id of current user
  const { userId } = store.getters;

  // set the user to the userID we get from our getters
  itemToPublish.user = userId;

  // set up tags
  if (item.tagsSearchbale) {
    itemToPublish.tags = {};

    item.tagsSearchbale.forEach((tag) => {
      itemToPublish.tags[tag] = true;
    });
  }

  // check to see if there is a new main image file uploaded
  if (itemToPublish.mainImage) {
    if (itemToPublish.mainImage.constructor === FileList
    || itemToPublish.mainImage.constructor === File) {
      // if the value in mainImage is a file,
      // set the item's mainImage value to be the uploaded
      // file's name with size and last modified values to keep unique
      const mainImage = itemToPublish.mainImage[0];
      itemToPublish.mainImage = `${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`;

      // put the image in firestore
      storageRef.child(`${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`).put(mainImage);
    }
  }

  // clear out otherImages as we'll reassigning them with just the name value
  itemToPublish.otherImages = [];

  // Secondary Images
  if (item.otherImages) {
    // loop through each item in otherImages array
    item.otherImages.forEach((photo, index) => {
      if (photo.constructor === FileList || photo.constructor === File) {
        storageRef.child(`${photo.lastModified}-${photo.size}-${photo.name}`).put(photo);
        itemToPublish.otherImages[index] = `${photo.lastModified}-${photo.size}-${photo.name}`;
      } else {
        itemToPublish.otherImages[index] = photo;
      }
    });
  }

  // create slug
  itemToPublish.slug = slugify.sanitizeTitle(`${itemToPublish.name} ${itemToPublish.addressDetails.city} ${itemToPublish.addressDetails.state}`);

  // push to firestore
  if (item.ID) {
    db.collection('items').doc(itemToPublish.ID)
      .update(itemToPublish).then(() => {
        itemToPublish.objectID = itemToPublish.ID;
        updateAlgolia(itemToPublish);
      });
  } else {
    db.collection('items').add(itemToPublish)
      .then((res) => {
      // res.id has the id to add to user's item array
      // update item with it's ID
        itemToPublish.ID = res.id;

        db.collection('items').doc(itemToPublish.ID)
          .update(itemToPublish);

        db.collection('users').doc(itemToPublish.user)
          .update({
            items: firebase.firestore.FieldValue.arrayUnion(res.id),
          });

        // update algolia
        itemToPublish.objectID = itemToPublish.ID;
        updateAlgolia(itemToPublish);
      });
  }
};

// set booked rental dates for item
// PARAMS:
//    dates:
//      array of dates the item is booked for
//    itemId:
//      id of item to add booked dates to
export const BOOK_DATES = (dates, itemId) => {
  db.collection('items').doc(itemId).update({
    rentalDates: firebase.firestore.FieldValue.arrayUnion(...dates),
  });
};

// Add rental info to an item
// PARAMS:
//    rental:
//      id of rental transaction
//    itemId:
//      id of item to add rental info to
export const ADD_RENTAL_TO_ITEM = (rentalId, itemId) => {
  db.collection('items').doc(itemId)
    .update({
      rentals: firebase.firestore.FieldValue.arrayUnion(rentalId),
    });
};

// Add conversation to an item
// PARAMS:
//    conversationId:
//      id of conversation
//    itemId:
//      id of item to add conversation to
//    userId:
//      id of current user
//    ownerId:
//      id of owner of item
export const ADD_CONVO_TO_ITEM = (conversationId, itemId, userId, ownerId) => {
  const conversation = {
    conversationId,
    userId,
    ownerId,
  };

  db.collection('items').doc(itemId)
    .update({
      conversations: firebase.firestore.FieldValue.arrayUnion(conversation),
    });
};
