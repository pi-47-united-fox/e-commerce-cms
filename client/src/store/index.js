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
    },
    LOGIN (state) {
      state.authenticated = true
    },
    LOGOUT (state) {
      state.authenticated = false
    },
  },
  actions: {
    login (context, payload) {
      const { email, password } = payload
      Axios
        .post('http://localhost:3000/login', { email, password })
        .then(({ data }) => {
          // console.log(data.access_token)
          localStorage.setItem('access_token', data.access_token)
          context.commit('LOGIN')
          router.push("/")
        })
        .catch(console.log)
    },
    fetchProducts ({ commit }) { 
      Axios
        .get('http://localhost:3000/products', 
          { 
            headers: {
              access_token: localStorage.access_token
            } 
          })
        .then(({ data }) => {
          console.log(data)
          commit('FETCH_PRODUCTS', data) 
        })
        .catch(console.log)
    },
    addProduct ({ commit }, payload) { 
      Axios
        .post('http://localhost:3000/product',payload,
          { 
            headers: {
              access_token: localStorage.access_token
            } 
          })
        .then(({ data }) => {
          console.log(data)
          commit('FETCH_PRODUCTS', data) 
        })
        .catch(console.log)
    },
    editProduct ({ commit }, payload) { 
      const {id,newData} = payload
      Axios
        .put(`http://localhost:3000/product/${id}`,newData,
          { 
            headers: {
              access_token: localStorage.access_token
            } 
          })
        .then(({ data }) => {
          console.log(data)
          commit('FETCH_PRODUCTS', data) 
        })
        .catch(console.log)
    },
    deleteProduct ({ commit }, payload) { 
      Axios
        .delete(`http://localhost:3000/product/${payload.id}`,
          { 
            headers: {
              access_token: localStorage.access_token
            } 
          })
        .then(({ data }) => {
          console.log(data)
          commit('FETCH_PRODUCTS', data) 
        })
        .catch(console.log)
    },
  },
  modules: {
  }
})
