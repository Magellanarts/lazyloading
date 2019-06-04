import Vue from 'vue';
import Vuex from 'vuex';
import item from './item/item';
import auth from './auth/auth';
import address from './address/address';
import conversations from './conversations/conversations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    item,
    auth,
    address,
    conversations,
  },
});
