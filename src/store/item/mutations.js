/* eslint no-param-reassign: [2, { "props": false }] */
import { firebaseMutations } from 'vuexfire';
import * as types from '../types';

export default {
  ...firebaseMutations,
  // Update mainImage on item detail page
  [types.MUTATE_MAIN_IMAGE]: (state, payload) => {
    state.mainImage = payload;
  },
};
