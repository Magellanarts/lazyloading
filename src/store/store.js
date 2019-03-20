import Vue from 'vue';
import Vuex from 'vuex';
import item from './item/item';
import tags from './tags/tags';
import auth from './auth/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    item,
    tags,
    auth,
  },
});
