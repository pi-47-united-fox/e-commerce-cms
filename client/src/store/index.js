import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
  },
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      state.players = payload
    },
   LOGIN (state, data) {
     
   }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios
      .get
      ('http://localhost:3000/products',{
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          console.log(data)
          commit('FETCH_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login( context, payload) {
      axios
        .post("http://localhost:3000/login", {
          email: payload.email,
          password: payload.password,
        })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },
  modules: {
  }
})
