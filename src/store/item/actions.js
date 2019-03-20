import { firebaseAction } from 'vuexfire';
import { db } from '@/auth';
import * as types from '../types';

export default {
  // Update main image on item page
  // Used for switching between thumbnails
  [types.UPDATE_MAIN_IMAGE]: ({ commit }, payload) => {
    commit(types.MUTATE_MAIN_IMAGE, payload);
  },
  // Sync curItem in store to item from Firebase
  [types.GET_ITEM_DATA_BY_DOC_ID]: firebaseAction(({ bindFirebaseRef, commit }, itemRef) => {
    const item = db.collection('items').doc(itemRef);
    bindFirebaseRef('curItem', item);

    // After sync, set the item's main image into separate mainIMage var in store
    item.get()
      .then((doc) => {
        commit(types.MUTATE_MAIN_IMAGE, doc.data().mainImage);
      });
  }),
  // Search for item in collection by slug
  // This is used when someone directly accesses an item page rather than coming via a link that includes the doc ID (such as the tags list or search list)
  [types.GET_ITEM_DATA_BY_NAME]: ({ dispatch }, itemRef) => {
    db.collection('items').where('slug', '==', itemRef).limit(1).get()
      .then((doc) => {
        // id of item we need is doc.docs[0].id
        dispatch(types.GET_ITEM_DATA_BY_DOC_ID, doc.docs[0].id);
      });
  },
};
