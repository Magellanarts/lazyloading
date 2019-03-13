import Vue from 'vue';
import Vuex from 'vuex';
import item from './item/item';
import tags from './tags/tags';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    item,
    tags,
  },
});
