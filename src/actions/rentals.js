import store from '@/store/store';

import { db } from '@/auth';

import {
  BOOK_DATES,
  ADD_RENTAL_TO_ITEM,
} from '@/actions/item';

import {
  ADD_RENTAL_TO_USER,
} from '@/actions/user';

import {
  GET_CONVERSATION_BY_FIELDS,
  ADD_MESSAGE,
  CREATE_CONVERSATION,
} from '@/actions/conversations';

import router from '@/router';

export const RENT_ITEM = async (
  itemId,
  dates,
  ownerId,
  totalDays,
  totalPrice,
  deposit,
  name,
  chargeId,
) => {
  const { userId, userEmail } = store.getters;

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
    chargeId,
  };

  const message = {
    message: `${name} has been rented`,
    sender: 'SYSTEM',
    timestamp: new Date(),
  };

  const convos = await GET_CONVERSATION_BY_FIELDS(itemId, ownerId, userId);

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

    // add rentalID to item
    ADD_RENTAL_TO_ITEM(res.id, itemId);

    // add transaction reference to renter's rentals list
    ADD_RENTAL_TO_USER(res.id, userId);

    // add transaction reference to owner's rentals list
    ADD_RENTAL_TO_USER(res.id, ownerId);

    // send email
    fetch(`${process.env.VUE_APP_LAMBDA_ENDPOINT}send-email`, {
      method: 'POST',
      body: JSON.stringify({
        rentalID: res.id,
        name,
        dates,
        userEmail,
      }),
    });
  });

  // create convo
  const convo = await GET_CONVERSATION_BY_FIELDS(
    itemId,
    ownerId,
    localStorage.userId,
  );

  // direct user to messages page
  router.push(`/dashboard/messages/${convo[0].id}`);
};


export const CALCULATE_WEEKLY_DISCOUNT = (length, weeklyPrice, dailyPrice) => {
  if (length >= 7 && weeklyPrice && length / 30 < 1) {
    const totalWeeks = Math.floor(length / 7);
    const fullPricedWeekTotal = dailyPrice * 7;
    const discountWeekDifference = fullPricedWeekTotal - weeklyPrice;

    return totalWeeks * discountWeekDifference;
  }
  return '';
};

export const CALCULATE_MONTHLY_DISCOUNT = (length, monthlyPrice, dailyPrice) => {
  if (length >= 30 && monthlyPrice) {
    const totalMonths = Math.floor(length / 30);
    const fullPricedMonthTotal = dailyPrice * 30;
    const discountMonthDifference = fullPricedMonthTotal - monthlyPrice;

    return totalMonths * discountMonthDifference;
  }
  return '';
};

export const CALCULATE_TOTAL_PRICE = (
  length,
  deposit,
  dailyPrice,
  monthlyPrice,
  weeklyPrice,
) => parseInt((length * dailyPrice), 10)
  + parseInt(deposit, 10)
  - CALCULATE_MONTHLY_DISCOUNT(
    length,
    monthlyPrice,
    dailyPrice,
  )
  - CALCULATE_WEEKLY_DISCOUNT(
    length,
    weeklyPrice,
    dailyPrice,
  );
