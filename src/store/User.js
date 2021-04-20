import axios from 'axios'


const state = {
  listUser : []
}



const getters = {

}

const mutations = {
  SET_USER(state, payload) {
    state.listUser = payload
  },
}

const actions = {
  async fetchUser({ commit }) {
    await axios.get('http://localhost:3004/users')
    .then (response => {
      commit("SET_USER", response.data);
    })
  }
}

export default {
  namespace: true, //phân biệt khi dispart tới store nào
  state,
  getters,
  actions,
  mutations
}
