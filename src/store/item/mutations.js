/* eslint no-param-reassign: [2, { "props": false }] */
import { MUTATE_ITEM, MUTATE_MAIN_IMAGE } from '../types';

export default {
  // Update mainImage on item detail page
  [MUTATE_MAIN_IMAGE]: (state, payload) => {
    state.mainImage = payload;
  },
  [MUTATE_ITEM]: (state, item) => {
    state.curItem = item;
  },
};
