/* eslint no-param-reassign: [2, { "props": false }] */
import { MUTATE_TAGS } from '../types';

export default {
  [MUTATE_TAGS]: (state, item) => {
    state.items = item;
  },
};
