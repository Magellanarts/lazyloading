// TODO: Comment code
// DONE TODO: Replace Sign up/Login when user is signed in
// DONE TODO: User Sign up
// TODO: Account Page
// TODO: List item form
// TODO: Reviews for item
// INPROGRESS TODO: Hook up search
// TODO: Search only nearby items

import Vue from 'vue';
import InstantSearch from 'vue-instantsearch';
import App from './App.vue';
import router from './router';
import store from './store/store';

import './auth';

require('@/assets/style/global.scss');

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(InstantSearch);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
