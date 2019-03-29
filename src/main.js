// TODO: Account Page
// TODO: Reviews for item
// TODO: Set up Algolia to sync with firestore whenever an item gets added
// TODO: Limit search results to 10. Add a View More button to take to a search page
// TODO: Payment processing

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
