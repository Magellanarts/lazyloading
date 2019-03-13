import { firebaseAction } from 'vuexfire';
import { db } from '@/main';
import * as types from '../types';

export default {
  // sync curItem in store to item from Firebase
  [types.GET_TAG_ITEMS]: firebaseAction(({ bindFirebaseRef }, tag) => {
    bindFirebaseRef('items', db.collection('items').where(`tags.${tag}`, '==', true));
  }),
};
