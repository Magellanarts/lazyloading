/* eslint-disable import/prefer-default-export */
import { db } from '@/auth';

// Get all items with a certain tag
// PARAMS:
//    tag:
//      tag to search for
export const GET_TAG_ITEMS = tag => new Promise((resolve) => {
  db.collection('items').where(`tags.${tag}`, '==', true).get()
    .then((querySnapshot) => {
      const items = [];
      querySnapshot.docs.forEach((item) => {
        items.push(item.data());
      });
      resolve(items);
    });
});
