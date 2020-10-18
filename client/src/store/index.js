import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    banners:[],
    authenticated: false,
    errMessage: '',
    addForm: false,
    editForm: false,
    editProductData: {},

  },
  mutations: {
    FETCH_PRODUCTS(state, payload) {
      state.products = payload
    },
    FETCH_CATEGORIES(state, payload) {
      state.categories = payload
    },
    FETCH_BANNERS(state, payload) {
      state.banners = payload
    },
    LOGIN(state) {
      state.authenticated = true
    },
    LOGOUT(state) {
      state.authenticated = false
    },
    CLEAR_ERRMSG(state) {
      state.errMessage = ''
    },
    SET_ERRMSG(state, data) {
      state.errMessage = data
    },
    TOGGLE_ADDFORM(state, data) {
      state.addForm = !state.addForm
    },
    TOGGLE_EDITFORM(state, data) {
      state.editForm = !state.editForm
    },
    SET_EDITPRODUCTDATA(state, data) {
      state.editProductData = data
    },
  },
  actions: {
    login(context, payload) {
      const { email, password } = payload
      Axios
        .post('http://localhost:3000/login', { email, password })
        .then(({ data }) => {
          // console.log(data.access_token)
          localStorage.setItem('access_token', data.access_token)
          context.commit('LOGIN')
          context.commit('CLEAR_ERRMSG')
          router.push("/")
        })
        .catch(err => {
          console.log(err.response.data);
          context.commit('SET_ERRMSG', err.response.data.msg)
        })
    },
    fetchProducts({ commit, dispatch }) {
      console.log("fetching products");
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
          // dispatch('fetchCategories')
        })
        .catch(console.log)
    },
    fetchBanners({ commit, dispatch }) {
      // console.log("fetching Banner");
      Axios
        .get('http://localhost:3000/banners',
          {
            headers: {
              access_token: localStorage.access_token
            }
          })
        .then(({ data }) => {
          console.log(data)
          commit('FETCH_BANNERS', data)
          // dispatch('fetchCategories')
        })
        .catch(console.log)
    },
    fetchCategories({ commit, dispatch }) {
      console.log("fetching categories");
      Axios
        .get('http://localhost:3000/categories',
          {
            headers: {
              access_token: localStorage.access_token
            }
          })
        .then(({ data }) => {
          console.log(data)
          commit('FETCH_CATEGORIES', data)
        })
        .catch(console.log)
    },
    addProduct({ commit, dispatch }, payload) {
      console.log(payload);
      Axios
        .post('http://localhost:3000/product', payload,
          {
            headers: {
              access_token: localStorage.access_token
            }
          })
        .then(({ data }) => {
          console.log(data)
          commit('TOGGLE_ADDFORM')
          commit('CLEAR_ERRMSG')
          dispatch('fetchProducts')
          dispatch('fetchCategories')
        })
        .catch(({ response }) => {

          commit('SET_ERRMSG', response.data.msg)
          console.log(response);
        })
    },
    editProduct({ commit, dispatch }, payload) {
      // console.log(payload);
      const { id, newData } = payload
      // console.log(id);
      // console.log(newData);
      Axios
        .put(`http://localhost:3000/product/${id}`, newData,
          {
            headers: {
              access_token: localStorage.access_token
            }
          })
        .then(({ data }) => {
          console.log(data)
          commit('TOGGLE_EDITFORM')
          commit('CLEAR_ERRMSG')
          dispatch('fetchProducts')
          dispatch('fetchCategories')
        })
        .catch(({ response }) => {
          commit('SET_ERRMSG', response.data.msg)
          console.log(response);
        })
    },
    deleteProduct({ commit, dispatch }, payload) {
      Axios
        .delete(`http://localhost:3000/product/${payload}`,
          {
            headers: {
              access_token: localStorage.access_token
            }
          })
        .then(({ data }) => {
          console.log(data)
          dispatch('fetchProducts')
          dispatch('fetchCategories')
        })
        .catch(console.log)
    },
    addBanner({ commit, dispatch }, payload) {
      console.log(payload);
      Axios
        .post('http://localhost:3000/banner', payload,
          {
            headers: {
              access_token: localStorage.access_token
            }
          })
        .then(({ data }) => {
          console.log(data) 
          commit('CLEAR_ERRMSG')
          dispatch('fetchBanners') 
        })
        .catch(({ response }) => {

          commit('SET_ERRMSG', response.data.msg)
          console.log(response);
        })
    },
    editBanner({ commit, dispatch }, payload) {
      // console.log(payload);
      const { id, newData } = payload
      // console.log(payload);
      console.log(id);
      console.log(newData);
      Axios
        .put(`http://localhost:3000/Banner/${id}`, newData,
          {
            headers: {
              access_token: localStorage.access_token
            }
          })
        .then(({ data }) => {
          console.log(data) 
          commit('CLEAR_ERRMSG')
          dispatch('fetchBanners') 
        })
        .catch(({ response }) => {
          commit('SET_ERRMSG', response.data.msg)
          console.log(response);
        })
    },
    deleteBanner({ commit, dispatch }, payload) {
      Axios
        .delete(`http://localhost:3000/Banner/${payload}`,
          {
            headers: {
              access_token: localStorage.access_token
            }
          })
        .then(({ data }) => {
          console.log(data)
          dispatch('fetchBanners') 
        })
        .catch(console.log)
    },
  },
  modules: {
  }
})
