// TODO: Account Page
// TODO: Reviews for item
// TODO: Limit search results to 10. Add a View More button to take to a search page
// TODO: Fix slugs for new items. generate unique id?
// TODO: fix forms. not every field should be required
// TODO: Show User name on product
//        link to user’s page?
//        need to build user’s page
//        other items offered by this user
//        response rate of user
// TODO: other similar items in the area
// TODO: Add weekly/monthly prices
// TODO: Adjust site wanting user's location all the time
// TODO: Add loading animations while waiting for component
//  show when images are loading

// https://paletton.com/#uid=53S0u0knNXQc0ZwirYGt8VYFPRD


import Vue from 'vue';
import InstantSearch from 'vue-instantsearch';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue2TouchEvents from 'vue2-touch-events';
import router from './router';
import store from './store/store';

import './auth';

import App from './App.vue';

// handle swipe
Vue.use(Vue2TouchEvents);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAs2RUHr98KDYRCjGvJ3XuNZC5ae3ilQAg',
    libraries: 'places',
  },
});

require('@/assets/style/global.scss');

Vue.config.productionTip = false;


if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true;
}

Vue.use(InstantSearch);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
