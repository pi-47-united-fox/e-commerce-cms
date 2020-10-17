import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {}
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setProduct (state, payload) {
      state.product = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'post',
        url: `https://e-commerce-cms-uwu.herokuapp.com/login`,
        data: payload
        })
        .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            router.push({ name: 'Home' })
        })
        .catch(err => {
            console.log(err)
        })
    },
    fetchProducts (context) {
      axios({
        url: 'https://e-commerce-cms-uwu.herokuapp.com/stocks',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setProducts', data)
        })
        .catch(console.log)
    },
    addProduct (context, payload) {
      axios({
        method: 'post',
        url: `https://e-commerce-cms-uwu.herokuapp.com/stocks`,
        data: payload,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (context, payload) {
      axios({
        method: 'delete',
        url: `https://e-commerce-cms-uwu.herokuapp.com/stocks/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          // router.push({ name: 'Home' })
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProductById (context, payload) {
      axios({
        method: 'get',
        url: `https://e-commerce-cms-uwu.herokuapp.com/stocks/${payload}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setProduct', data)
          console.log(data, 'product hasil hit axios get by id')
          
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct (context, payload) {
      let productId = payload.id
      delete payload.id
      axios({
        method: 'put',
        url: `https://e-commerce-cms-uwu.herokuapp.com/stocks/${productId}`,
        data: payload,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
