import {
  SET_ITEM_DETAILS,
  MUTATE_ITEM,
} from '../types';

export default {
  [SET_ITEM_DETAILS]: ({ commit }, item) => {
    commit(MUTATE_ITEM, item);
  },
};
