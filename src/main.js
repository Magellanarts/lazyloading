import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

require('@/assets/style/global.scss');

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueFire);
firebase.initializeApp({
  projectId: 'lazyloading-c3f8a',
  databaseURL: 'https://lazyloading-c3f8a.firebaseio.com',
});

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
