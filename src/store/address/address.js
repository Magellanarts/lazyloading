import addressActions from './actions';
import addressMutations from './mutations';
import addressGetters from './getters';

const state = {
  curAddress: {},
};

const actions = addressActions;

const mutations = addressMutations;

const getters = addressGetters;

export default {
  state,
  actions,
  mutations,
  getters,
};
