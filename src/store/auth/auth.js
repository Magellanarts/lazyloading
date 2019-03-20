import authActions from './actions';
import authMutations from './mutations';
import authGetters from './getters';

const state = {
  user: null,
  userId: null,
};

const actions = authActions;

const mutations = authMutations;

const getters = authGetters;

export default {
  state,
  actions,
  mutations,
  getters,
};
