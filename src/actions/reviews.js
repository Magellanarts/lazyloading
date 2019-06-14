import store from '@/store/store';
import { db } from '@/auth';

import {
  GET_USER_NAME,
  ADD_REVIEW_TO_USER,
} from '@/actions/user';

import {
  SET_RENTAL_TO_REVIEWED,
} from '@/actions/rentals';

import {
  ADD_REVIEW_TO_ITEM,
  INCREMENT_ITEM_SCORE,
} from '@/actions/item';

// Create a Review
// PARAMS:
//    score:
//      score of review
//    review:
//      review text
//    itemId:
//      id of item being reviewed
//    ownerId:
//      id of owner of item
//    rentalId:
//      id of the rental transaction
export const CREATE_REVIEW = async (score, reviewText, itemId, ownerId, rentalId, rentalDate) => {
  const { userId } = store.getters;

  const reviewerName = await GET_USER_NAME();

  const review = {
    score,
    text: reviewText,
    itemId,
    reviewerId: userId,
    ownerId,
    rentalId,
    rentalDate,
    reviewerName,
  };

  db.collection('reviews').add(review)
    .then((res) => {
      // update rental transaction to show this has been reviewed

      // tracking item's score
      // add review's score to item's total score
      // then can divide by total # of reviews to get average
      INCREMENT_ITEM_SCORE(score, itemId);

      // Add review ID (res.id) to item
      ADD_REVIEW_TO_ITEM(res.id, itemId);

      // Add review ID (res.id) to owner
      ADD_REVIEW_TO_USER(res.id, ownerId);

      // Add review ID (res.id) to reviewer
      ADD_REVIEW_TO_USER(res.id, userId);

      // Set reviewed to true on the rental
      SET_RENTAL_TO_REVIEWED(rentalId);
    });
};

// Get the details for a review
// PARAMS:
//    reviewId:
//      id of review to retrieve
export const GET_REVIEW_DETAILS = reviewId => new Promise((resolve) => {
  db.collection('reviews').doc(reviewId).get()
    .then(doc => resolve(doc.data()));
});

export const GET_MULTIPLE_REVIEW_DETAILS = async (arrayOfReviewIds) => {
  const reviews = [];
  await Promise.all(arrayOfReviewIds.map(async (reviewId) => {
    const review = await GET_REVIEW_DETAILS(reviewId);
    reviews.push(review);
  }));

  return reviews;
};
