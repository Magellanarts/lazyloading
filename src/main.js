// DONE TODO: Comment code logic
// DONE TODO: Replace Sign up/Login when user is signed in
// DONE TODO: User Sign up
// TODO: Account Page
// TODO: List item form
// TODO: When creating tags object, create tagsSearchable. Makes sure tags searchable by Algolia
// TODO: Reviews for item
// INPROGRESS TODO: Hook up search
// TODO: Set up Algolia to sync with firestore whenever an item gets added
// TODO: Limit search results to 10. Add a View More button to take to a search page
// TODO: Search only nearby items
// TODO: Payment processing
// TODO: Create form field components

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
