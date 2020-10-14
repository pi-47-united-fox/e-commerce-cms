import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    category: [],
    inputData: {}
  },
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      this.state.products = payload
    },
    ADD_DATA (state, payload) {
      this.state.inputData = payload
    }
  },
  actions: {
    fetchProducts (context, payload) {
      console.log('ini dispacth dari CR')
      axios
        .get('http://localhost:3000/products')
        .then(({ data }) => {
          context.commit('FETCH_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err, 'err dari fetch data product')
        })
    },
    addProducts (context, payload) {
      axios
        .post('http://localhost:3000/products')
        .then(({ data }) => {
          context.commit('ADD_DATA', data)
        })
        .catch(err => {
          console.log(err, 'err add data uy!')
        })
    },

    login (context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
        })
        .catch(err => {
          console.log(err, 'error dari login')
        })
    }
  },
  getters: {
    // filter product data by category
    getCategoryCrossCountry: state => {
      return state.category.filter(el => el.category === 'cross country')
    },
    getCategoryAllMountain: state => {
      return state.category.filter(el => el.category === 'all mountain')
    },
    getCategoryCityBike: state => {
      return state.category.filter(el => el.category === 'city bike')
    },
    getCategoryBmx: state => {
      return state.category.filter(el => el.category === 'bmx')
    }

  },
  modules: {
  }
})
