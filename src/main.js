// TODO: Account Page
// TODO: Limit search results to 10. Add a View More button to take to a search page
// TODO: fix forms. not every field should be required
// TODO: Show User name on product
//        link to user’s page?
//        need to build user’s page
//        other items offered by this user
//        response rate of user
// TODO: other similar items in the area
// TODO: Adjust site wanting user's location all the time
// TODO: Add loading animations while waiting for component
//  show when images are loading

// IDEA: https://jariz.github.io/vibrant.js/
//        user uploads image and grab colors to generate site colors
// IDEA: https://paletton.com/#uid=53S0u0knNXQc0ZwirYGt8VYFPRD


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

// set up vue google maps
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_KEY,
    libraries: 'places',
  },
});

require('@/assets/style/global.scss');

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true;
}

Vue.use(InstantSearch);

/*
// Creating serviceWorker
if ('serviceWorker in navigator') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, (err) => {
        // registration failed
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
*/
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
