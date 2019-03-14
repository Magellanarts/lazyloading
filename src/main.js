// TODO: Replace Sign up/Login when user is signed in
// TODO: User Sign up
// TODO: Account Page
// TODO: List item form
// TODO: Reviews for item
// TODO: Hook up search
// TODO: Search only nearby items

import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store/store';

import 'firebase/firestore';

require('@/assets/style/global.scss');

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueFire);
firebase.initializeApp({
  projectId: 'lazyloading-c3f8a',
  databaseURL: 'https://lazyloading-c3f8a.firebaseio.com',
  apiKey: 'AIzaSyCQb0GOSMlEM5RiQKVebLiQVENziV61JfQ',
});

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
