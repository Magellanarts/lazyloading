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

// Get rental by ID
// PARAMS:
//    rentalId:
//      id of rental to return
export const GET_RENTAL_BY_ID = rentalId => new Promise((resolve) => {
  // After sync, set the item's main image into separate mainIMage var in store
  db.collection('rentals').doc(rentalId).get()
    .then(doc => resolve(doc.data()));
});


// Handle the rental process
// PARAMS:
//    itemId:
//      id of item being rented
//    dates:
//      array of dates item is being rented
//    ownerId:
//      id of the owner of item
//    totalPrice:
//      price of rental
//    desposit:
//      amount of deposit required
//    name:
//      name of item being rented
//    chargeId:
//      id of the charge on Stripe
export const RENT_ITEM = async (
  itemId,
  dates,
  ownerId,
  totalPrice,
  deposit,
  name,
  chargeId,
) => {
  // get id and email of current user
  const { userId, userEmail } = store.getters;

  // calculate total days of rental
  const totalDays = dates.length;

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

  // create message object
  // includes message text, sender (in this case SYSTEM) and timestamp
  const message = {
    message: `${name} has been rented`,
    sender: 'SYSTEM',
    timestamp: new Date(),
  };

  // try to retrieve a conversation based on this item and set of users
  // is an async call and will wait for response
  const convos = await GET_CONVERSATION_BY_FIELDS(itemId, ownerId, userId);

  // if previous call has a result, that means there is already
  // a conversation between these users about this item
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
    rental.ID = res.id;

    db.collection('rentals').doc(rental.ID)
      .update(rental);

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

// Helper function to calculate the weekly discount (if applicable)
// PARAMS:
//    numberOfDays:
//      number of days for rental
//    weeklyPrice:
//      weekly price for renting an item
//    dailyPrice:
//      daily price for renting an item
export const CALCULATE_WEEKLY_DISCOUNT = (numberOfDays, weeklyPrice, dailyPrice) => {
  if (numberOfDays >= 7 && weeklyPrice && numberOfDays / 30 < 1) {
    const totalWeeks = Math.floor(numberOfDays / 7);
    const fullPricedWeekTotal = dailyPrice * 7;
    const discountWeekDifference = fullPricedWeekTotal - weeklyPrice;

    return totalWeeks * discountWeekDifference;
  }
  return '';
};

// Helper function to calculate the monthly discount (if applicable)
// PARAMS:
//    numberOfDays:
//      number of days for rental
//    monthlyPrice:
//      monthly price for renting an item
//    dailyPrice:
//      daily price for renting an item
export const CALCULATE_MONTHLY_DISCOUNT = (numberOfDays, monthlyPrice, dailyPrice) => {
  if (numberOfDays >= 30 && monthlyPrice) {
    const totalMonths = Math.floor(numberOfDays / 30);
    const fullPricedMonthTotal = dailyPrice * 30;
    const discountMonthDifference = fullPricedMonthTotal - monthlyPrice;

    return totalMonths * discountMonthDifference;
  }
  return '';
};

// Helper function to calculate total price of rental
// PARAMS:
//    numberOfDays:
//      number of days for rental
//    deposit:
//      amount of deposit required
//    dailyPrice:
//      daily price for renting an item
//    weeklyPrice:
//      weekly price for renting an item
//    monthlyPrice:
//      monthly price for renting an item
export const CALCULATE_TOTAL_PRICE = (
  numberOfDays,
  deposit,
  dailyPrice,
  monthlyPrice,
  weeklyPrice,
) => parseInt((numberOfDays * dailyPrice), 10)
  + parseInt(deposit, 10)
  - CALCULATE_MONTHLY_DISCOUNT(
    numberOfDays,
    monthlyPrice,
    dailyPrice,
  )
  - CALCULATE_WEEKLY_DISCOUNT(
    numberOfDays,
    weeklyPrice,
    dailyPrice,
  );
