import { db } from '@/auth';
import { GET_TAG_ITEMS, MUTATE_TAGS } from '../types';

export default {
  // Sync items in store to items from Firebase with specified tag
  [GET_TAG_ITEMS]: ({ commit }, tag) => {
    db.collection('items').where(`tags.${tag}`, '==', true).get()
      .then((querySnapshot) => {
        const items = [];
        for (const item of querySnapshot.docs) {
          items.push(item.data());
        }
        commit(MUTATE_TAGS, items);
      });
  },
};
