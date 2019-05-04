import store from '@/store/store';

import { db } from '@/auth';

import {
  BOOK_DATES,
} from '@/actions/item';

import {
  ADD_RENTAL,
} from '@/actions/user';

export const RENT_ITEM = (itemId, dates, ownerId, totalDays, totalPrice, name) => {
  const { userId } = store.getters;
  console.log(itemId, dates, ownerId, userId);

  // update item's booked dates
  BOOK_DATES(dates, itemId);

  // add transaction to rental table
  const rental = {
    owner: ownerId,
    user: userId,
    item: itemId,
    dates,
    totalDays,
    totalPrice,
    name,
  };
  db.collection('rentals').add(rental).then((res) => {
    // res.id has id of rental transaction

    // add transaction reference to renter's rentals list
    ADD_RENTAL(res.id, userId);

    // add transaction reference to owner's rentals list
    ADD_RENTAL(res.id, ownerId);
  });
};


export const something = () => {

};
