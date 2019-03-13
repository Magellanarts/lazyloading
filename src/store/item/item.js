import itemActions from './actions';
import itemMutations from './mutations';

const state = {
  mainImage: '',
  curItem: {},
  id: '',
};

const actions = itemActions;

const mutations = itemMutations;

export default {
  state,
  actions,
  mutations,
};
