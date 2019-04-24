import { db } from '@/auth';

// eslint-disable-next-line import/prefer-default-export
export const GET_TAG_ITEMS = tag => new Promise((resolve) => {
  db.collection('items').where(`tags.${tag}`, '==', true).get()
    .then((querySnapshot) => {
      const items = [];
      for (const item of querySnapshot.docs) {
        items.push(item.data());
      }
      resolve(items);
    });
});
