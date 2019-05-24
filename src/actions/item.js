import firebase from 'firebase/app';
import 'firebase/storage';
import { slugify } from '@/mixins';
import store from '@/store/store';

import { db, updateAlgolia } from '@/auth';


const storageRef = firebase.storage().ref();

const handleSecondaryImages = (otherImages) => {
  const imagesObject = {};

  otherImages.forEach((photo) => {
    imagesObject.push(`${photo.lastModified}-${photo.size}-${photo.name}`);

    storageRef.child(`${photo.lastModified}-${photo.size}-${photo.name}`).put(photo);
  });

  return imagesObject;
};

export const GET_ITEM_DATA_BY_DOC_ID = itemRef => new Promise((resolve) => {
  // After sync, set the item's main image into separate mainIMage var in store
  db.collection('items').doc(itemRef).get()
    .then(doc => resolve(doc.data()));
});

export const GET_ITEM_DATA_BY_NAME = itemRef => new Promise((resolve) => {
  db.collection('items').where('slug', '==', itemRef).limit(1).get()
    .then((doc) => {
      // id of item we need is doc.docs[0].id
      GET_ITEM_DATA_BY_DOC_ID(doc.docs[0].id).then(res => resolve(res));
    });
});


export const UPDATE_ITEM = (item) => {
  const itemToPublish = { ...item };
  // set up tags
  itemToPublish.tags = {};

  item.tagsSearchbale.forEach((tag) => {
    itemToPublish.tags[tag] = true;
  });

  if (item.mainImage) {
    if (item.mainImage.constructor === FileList) {
      // mainImage has changed, we need to upload it
      const mainImage = item.mainImage[0];
      itemToPublish.mainImage = `${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`;
      storageRef.child(`${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`).put(mainImage);
    }
  }

  if (item.otherImages.length > 0) {
    item.otherImages.forEach((photo, index) => {
      if (photo.constructor === FileList || photo.constructor === File) {
        itemToPublish.otherImages[index] = `${photo.lastModified}-${photo.size}-${photo.name}`;

        storageRef.child(`${photo.lastModified}-${photo.size}-${photo.name}`).put(photo);
      }
    });
  }


  db.collection('items').doc(itemToPublish.ID)
    .update(itemToPublish).then(() => {
      itemToPublish.objectID = itemToPublish.ID;
      updateAlgolia(itemToPublish);
    });
};

export const CREATE_ITEM = (item, userID) => {
  // copy item object so we can reassign some values
  const itemToPublish = { ...item };

  // set the user to the userID we get from our getters
  itemToPublish.user = userID;

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
    itemToPublish.otherImages = handleSecondaryImages(item.otherImages);
  }

  // set up tags
  if (item.tagsSearchbale) {
    itemToPublish.tags = {};

    item.tagsSearchbale.forEach((tag) => {
      itemToPublish.tags[tag] = true;
    });
  }

  // create slug
  itemToPublish.slug = slugify.sanitizeTitle(`${itemToPublish.name} ${itemToPublish.city} ${itemToPublish.state}`);

  // push to firestore
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
};

export const EDIT_ITEM = (item) => {
  const { userId } = store.getters;

  // copy item object so we can reassign some values
  const itemToPublish = { ...item };

  // set up tags
  if (item.tagsSearchbale) {
    itemToPublish.tags = {};

    item.tagsSearchbale.forEach((tag) => {
      itemToPublish.tags[tag] = true;
    });
  }

  // set the user to the userID we get from our getters
  itemToPublish.user = userId;

  // Main image First
  if (item.mainImage) {
    if (item.mainImage.constructor === FileList || item.mainImage.constructor === File) {
      const mainImage = item.mainImage[0];
      itemToPublish.mainImage = `${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`;

      storageRef.child(`${mainImage.lastModified}-${mainImage.size}-${mainImage.name}`).put(mainImage);
    }
  }

  // clear out otherImages as we'll reassigning them with just the name value
  itemToPublish.otherImages = [];
  // Secondary Images

  if (item.otherImages) {
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


export const BOOK_DATES = (dates, item) => {
  db.collection('items').doc(item).update({
    rentalDates: firebase.firestore.FieldValue.arrayUnion(...dates),
  });
};


export const ADD_RENTAL_TO_ITEM = (rental, item) => {
  db.collection('items').doc(item)
    .update({
      rentals: firebase.firestore.FieldValue.arrayUnion(rental),
    });
};

export const ADD_CONVO_TO_ITEM = (convo, item, userId, ownerId) => {
  const conversation = {
    conversationId: convo,
    userId,
    ownerId,
  };

  db.collection('items').doc(item)
    .update({
      conversations: firebase.firestore.FieldValue.arrayUnion(conversation),
    });
};
