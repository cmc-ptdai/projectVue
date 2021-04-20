

const state = {
  dataUser: {},
  isModal: false,
}

const getters = {
  getDataUser(state) {
    return state.dataUser
  },
  getIsModal(state) {
    return state.isModal
  }
}

const actions = {

}

const mutations = {
  SET_DATA(state , payload) {
    state.dataUser = payload
  },
  SET_IS_MODAL(state , payload) {
    state.isModal = payload
    console.log(state.isModal);
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
