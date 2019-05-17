import store from '@/store/store';

import { db } from '@/auth';

import {
  BOOK_DATES,
} from '@/actions/item';

import {
  ADD_RENTAL,
} from '@/actions/user';

import {
  GET_CONVERSATION_BY_FIELDS,
  ADD_MESSAGE,
  CREATE_CONVERSATION,
} from '@/actions/conversations';


export const RENT_ITEM = async (itemId, dates, ownerId, totalDays, totalPrice, deposit, name) => {
  console.log('rented');
  /* const { userId } = store.getters;

  // update item's booked dates
  BOOK_DATES(dates, itemId);

  // add transaction to rental table
  const rental = {
    ownerId,
    userId,
    itemId,
    dates,
    totalDays,
    totalPrice,
    deposit,
    name,
  };

  const convos = await GET_CONVERSATION_BY_FIELDS(itemId, ownerId, userId);

  const message = {
    message: `${name} has been rented`,
    sender: 'SYSTEM',
    timestamp: new Date(),
  };


  if (convos.length > 0) {
    // this user has already contacted the owner about this item
    // add the message to their existing convo
    ADD_MESSAGE(message, convos[0].id);
  } else {
    // create new conversation
    CREATE_CONVERSATION(itemId, ownerId, message, name);
  }


  db.collection('rentals').add(rental).then((res) => {
    // res.id has id of rental transaction

    // add transaction reference to renter's rentals list
    ADD_RENTAL(res.id, userId);

    // add transaction reference to owner's rentals list
    ADD_RENTAL(res.id, ownerId);
  }); */
};


export const something = () => {

};
