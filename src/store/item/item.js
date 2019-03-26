import itemActions from './actions';
import itemMutations from './mutations';
import itemGetters from './getters';

const state = {
  mainImage: '',
  curItem: {},
  id: '',
};

const actions = itemActions;

const getters = itemGetters;

const mutations = itemMutations;

export default {
  state,
  actions,
  mutations,
  getters,
};
