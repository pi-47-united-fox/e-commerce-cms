import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    auth_access: '',
    products: [],
    productNeedEdit: {}
  },
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      state.products = payload
    },
    ADD_PRODUCT (state, payload) {
      state.products.push(payload)
    },
    DELETE_PRODUCT (state, payload) {
      state.products.map(el => {
        if (el.id !== payload) {
          return el
        }
      })
      router.push({ path: '/' })
    },

    EDIT_PRODUCT_FORM (state, payload) {
      state.productNeedEdit = payload
    },

    EDIT_PRODUCT (state, payload) {
      state.products.map(el => {
        if (el.id === payload.id) {
          el.name = payload.name
          el.image_url = payload.image_url
          el.price = payload.price
          el.stock = payload.stock
          el.createdAt = payload.createdAt
          el.updatedAt = payload.updatedAt
        }
        return el
      })
    },

    LOGIN (state, payload) {
      state.isLogin = true
      state.auth_access = 'admin'
    },

    LOGOUT (state, payload) {
      state.isLogin = false
    }

  },
  actions: {
    fetchProducts (context, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          context.commit('FETCH_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteProduct (context, payload) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/products/${payload}`,
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          context.commit('DELETE_PRODUCT', payload)
          context.dispatch('fetchProducts')
        })
    },

    editProduct (context, payload) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/products/${payload.id}`,
        headers: { access_token: localStorage.access_token },
        data: payload
      })
        .then(({ data }) => {
          context.commit('EDIT_PRODUCT', payload)
          router.push({ path: '/' })
        })
    },

    editProductForm (context, payload) {
      context.commit('EDIT_PRODUCT_FORM', payload)
      router.push({ path: '/edit-product' })
    },

    login (context, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.commit('LOGIN', payload)
          router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.email = ''
          this.password = ''
        })
    },

    logout (context, payload) {
      localStorage.removeItem('access_token')
      context.commit('LOGOUT')
      router.push({ path: '/login' })
    },

    addProduct (context, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/products',
        headers: { access_token: localStorage.access_token },
        data: payload
      })
        .then(({ data }) => {
          context.commit('ADD_PRODUCT', data)
          router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }

  },
  modules: {
  }
})
