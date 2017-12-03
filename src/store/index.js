/* eslint no-param-reassign: ["error", { "props": false }] */

import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: '',
    sid: '',
    nearest: '',
  },
  mutations: {
    setUser(state, user) {
      console.log(user);
      state.user = user;
    },
    setSid(state, sid) {
      console.log(`Set sid to ${sid}`);
      state.sid = sid;
    },
    setNearest(state, nearest) {
      console.log(`Set nearest to ${nearest}`);
      state.nearest = nearest;
    },
  },
});
