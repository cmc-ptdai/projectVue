import Vue from 'vue';
import Vuex from 'vuex';
import Users from './User';
import EditForm from './EditForm';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users: Users,
    editForm: EditForm
  }
})

export default store
