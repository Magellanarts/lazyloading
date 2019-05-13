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


// TODO: Clean this file up. Add separate actions file
// Then use the messages view to push changes to conversations table in firebase
