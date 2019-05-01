// TODO: Account Page
// TODO: Reviews for item
// TODO: Limit search results to 10. Add a View More button to take to a search page
// TODO: Payment processing
// TODO: fix forms. not every field should be required
// TODO: Show User name on product
//        link to user’s page?
//          need to build user’s page
//        other items offered by this user
// TODO: other similar items in the area
// TODO: Action to ‘rent’ item
//        start chat?
//        add to cart?
// TODO: Calendar of availability


import Vue from 'vue';
import InstantSearch from 'vue-instantsearch';
import * as VueGoogleMaps from 'vue2-google-maps';

import router from './router';
import store from './store/store';

import './auth';

import App from './App.vue';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAs2RUHr98KDYRCjGvJ3XuNZC5ae3ilQAg',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    // // If you want to set the version, you can do so:
    // v: '3.26',
  },

  // // If you intend to programmatically custom event listener code
  // // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  // // you might need to turn this on.
  // autobindAllEvents: false,

  // // If you want to manually install components, e.g.
  // // import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  // // Vue.component('GmapMarker', GmapMarker)
  // // then disable the following:
  // installComponents: true,
});

require('@/assets/style/global.scss');


Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(InstantSearch);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
