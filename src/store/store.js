import Vue from 'vue';
import Vuex from 'vuex';
import Users from './User';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users: Users
  }
})

export default store
