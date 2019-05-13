import { firebaseMutations } from 'vuexfire';

import conversationActions from './actions';

const state = {
  chats: [],
};

const actions = conversationActions;

const mutations = {
  ...firebaseMutations,
};

export default {
  state,
  mutations,
  actions,
};
