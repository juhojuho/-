// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Firebase from 'firebase';
import 'vue-event-calendar/dist/style.css';
import vueEventCalendar from 'vue-event-calendar';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(vueEventCalendar, { locale: 'ko', color: '#001b44' });

const config = {
  apiKey: 'AIzaSyCezQZd3jwRT-CAqB2BYoBdLl3yaTBPCVo',
  authDomain: 'lanbutler-d72e6.firebaseapp.com',
  databaseURL: 'https://lanbutler-d72e6.firebaseio.com',
  projectId: 'lanbutler-d72e6',
  storageBucket: 'lanbutler-d72e6.appspot.com',
  messagingSenderId: '677827026281',
};

Firebase.initializeApp(config);
const db = Firebase.database();
Vue.prototype.$firebase = Firebase;
Vue.prototype.$db = db;
Vue.prototype.$storage = Firebase.storage();

Firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit('setUser', user);
    console.log('Authenticated');
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
