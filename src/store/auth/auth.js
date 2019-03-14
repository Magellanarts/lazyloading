import authActions from './actions';
import authMutations from './mutations';

const state = {
  user: null,
  userId: null,
  idToken: null,
};

const actions = authActions;

const mutations = authMutations;

export default {
  state,
  actions,
  mutations,
};
