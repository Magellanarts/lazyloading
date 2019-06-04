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


// Create a conversation
// PARAMS:
//    itemId:
//      id of item the conversation is about
//    partnerId:
//      id of second person in conversation
//    message:
//      message object with the initial message (message, sender, timestamp)
//    name:
//      name of object
export const CREATE_CONVERSATION = (itemId, partnerId, message, name) => {
  // get userId from strore
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
      message,
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

// Add message to a conversation
// PARAMS:
//    message:
//      object with message info (message, sender, timestamp)
//    convoID:
//      id of conversation to add message to
export const ADD_MESSAGE = (message, convoId) => new Promise((resolve) => {
  db.collection('conversations').doc(convoId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    }).then(doc => resolve(doc));
});

// Get a conversatino by conversation ID
// PARAMS:
//    convoID:
//      id of conversation to get
export const GET_CONVERSATION_BY_ID = convoID => new Promise((resolve) => {
  // After sync, set the item's main image into separate mainIMage var in store
  db.collection('conversations').doc(convoID).get()
    .then(doc => resolve(doc.data()));
});


// Get a conversation by item and users in conversation
// PARAMS:
//    itemId:
//      id of item in conversation
//    ownerId:
//      id of owner of item
//    userId:
//      id of current user
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


// Send message to owner
// PARAMS:
//    itemId:
//      id of item being messaged about
//    ownerId:
//      owner of item/person being messaged
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
