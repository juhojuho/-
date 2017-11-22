/* eslint no-param-reassign: ["error", { "props": false }] */

import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
});
