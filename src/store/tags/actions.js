import { firebaseAction } from 'vuexfire';
import { db } from '@/auth';
import * as types from '../types';

export default {
  // Sync items in store to items from Firebase with specified tag
  [types.GET_TAG_ITEMS]: firebaseAction(({ bindFirebaseRef }, tag) => {
    bindFirebaseRef('items', db.collection('items').where(`tags.${tag}`, '==', true));
  }),
};
