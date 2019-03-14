import { firebaseAction } from 'vuexfire';
import { db } from '@/main';
import * as types from '../types';

export default {
  [types.UPDATE_MAIN_IMAGE]: ({ commit }, payload) => {
    commit(types.MUTATE_MAIN_IMAGE, payload);
  },
  // sync curItem in store to item from Firebase
  [types.GET_ITEM_DATA_BY_DOC_ID]: firebaseAction(({ bindFirebaseRef, commit }, itemRef) => {
    const item = db.collection('items').doc(itemRef);
    bindFirebaseRef('curItem', item);

    item.get()
      .then((doc) => {
        commit(types.MUTATE_MAIN_IMAGE, doc.data().mainImage);
      });
  }),
  [types.GET_ITEM_DATA_BY_NAME]: ({ dispatch }, itemRef) => {
    db.collection('items').where('slug', '==', itemRef).limit(1).get()
      .then((doc) => {
        // id of item we need is doc.docs[0].id
        dispatch(types.GET_ITEM_DATA_BY_DOC_ID, doc.docs[0].id);
      });
  },
};
