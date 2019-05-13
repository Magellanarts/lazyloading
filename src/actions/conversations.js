import firebase from 'firebase/app';
import 'firebase/storage';
import store from '@/store/store';

import { db } from '@/auth';

import {
  ADD_CONVO_TO_USER,
} from '@/actions/user';

import {
  ADD_CONVO_TO_ITEM,
} from '@/actions/item';


export const CREATE_CONVERSATION = (itemId, partnerId, message, name) => {
  const { userId } = store.getters;

  // submit the message
  // create new entry in conversation table
  //  -- includes:
  //    -- id of owner
  //    -- id of renter
  //    -- array with messages:
  //      -- timestamp
  //      -- message
  //      -- who sent message
  //  add conversation ID to owner
  //  add conversation ID to renter
  //  add conversation ID to item


  // add message to conversation table
  const convo = {
    item: itemId,
    itemName: name,
    userId,
    ownerId: partnerId,
    messages: [
      {
        timestamp: new Date(),
        message,
        sender: userId,
      },
    ],
  };
  db.collection('conversations').add(convo).then((res) => {
    // add convo id to this convo
    convo.ID = res.id;

    db.collection('conversations').doc(convo.ID)
      .update(convo);

    // add convo id to owner
    // includes : convo id, owner id and user id
    ADD_CONVO_TO_USER(res.id, partnerId, userId);
    // add convo id to user
    // includes : convo id, owner id and user id
    ADD_CONVO_TO_USER(res.id, userId, partnerId);

    // add convo id to item
    // includes : convo id, item id, user id, and owner id
    ADD_CONVO_TO_ITEM(res.id, itemId, userId, partnerId);
  });
};

export const ADD_MESSAGE = (message, convoId) => new Promise((resolve) => {
  db.collection('conversations').doc(convoId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    }).then(doc => resolve(doc));
});

export const GET_CONVERSATION_BY_ID = convoID => new Promise((resolve) => {
  // After sync, set the item's main image into separate mainIMage var in store
  db.collection('conversations').doc(convoID).get()
    .then(doc => resolve(doc.data()));
});


export const GET_CONVERSATION_BY_FIELDS = (itemId, ownerId, userId) => new Promise((resolve) => {
  db.collection('conversations')
    .where('ownerId', '==', ownerId)
    .where('userId', '==', userId)
    .where('item', '==', itemId)
    .get()
    .then((querySnapshot) => {
      resolve(querySnapshot.docs);
    });
});

export const MESSAGE_OWNER = async (itemId, ownerId, message, name) => {
  const { userId } = store.getters;

  const convos = await GET_CONVERSATION_BY_FIELDS(itemId, ownerId, userId);

  const chat = {
    message,
    sender: userId,
    timestamp: new Date(),
  };

  if (convos.length > 0) {
    // this user has already contacted the owner about this item
    // add the message to their existing convo
    ADD_MESSAGE(chat, convos[0].id);
  } else {
    // create new conversation
    CREATE_CONVERSATION(itemId, ownerId, message, name);
  }
};
