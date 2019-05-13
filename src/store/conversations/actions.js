import { firebaseAction } from 'vuexfire';

import { db } from '@/auth';

import {
  STORE_BIND_CONVO,
} from '../types';


export default {
  [STORE_BIND_CONVO]: firebaseAction(({ bindFirebaseRef }, chatID) => {
    bindFirebaseRef('chats', db.collection('conversations').doc(chatID));
  }),
};
