import axios from 'axios'


const state = {
  listUser : []
}



const getter = {

}

const actions = {
  fetchUser () {
    axios.get('http://localhost:3004/users')
  }
}

const mutation = {

}

export default {
  state,
  getter,
  actions,
  mutation
}
