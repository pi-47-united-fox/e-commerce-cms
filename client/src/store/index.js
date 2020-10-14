import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    authenticated : false,
  },
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login (context, payload) {
      const { email, password } = payload
      Axios
        .post('http://localhost:3000/login', { email, password })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          router.push("/")
        })
        .catch(console.log)
    },
    fetchProduct ({ commit }) {
      Axios
        .get('http://localhost:3000/products', { }, { access_token: localStorage.access_token })
        .then(({ data }) => {
          console.log(data)
          commit('FETCH_PRODUCTS', data)
          localStorage.setItem('access_token', data.access_token)
        })
        .catch(console.log)
    }
  },
  modules: {
  }
})
