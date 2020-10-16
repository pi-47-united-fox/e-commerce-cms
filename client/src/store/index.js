import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    oneProduct: [],
    category: [],
    inputData: []
  },
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      this.state.products = payload
    },
    FETCH_ONE_PRODUCTS(state, payload) {
      this.state.oneProduct = payload
    },
    ADD_PRODUCTS (state, payload) {
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
    fetchOneProducts(context, payload) {
      const id = payload
      console.log(id,'>>>>')
      axios({
        method: 'GET',
        url: `http://localhost:3000/products/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data,'dari axios actinon fetch by id')
          context.commit('FETCH_ONE_PRODUCTS', data)
        })
        .catch(err => {
        console.log(err, 'err fetch one products')
      })
    },
    addProducts (context, payload) {
      axios({
        url: 'http://localhost:3000/products',
        method: 'POST',
        data: payload,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          console.log(data)
          console.log(data, 'success add data')
        })
        .catch(err => {
          console.log(err, 'err add data!')
          console.log('ini error adding data products >>>')
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
    },
    deleteProducts(context, payload) {
      const id = payload
      axios({
        method: "DELETE",
        url: `http://localhost:3000/products/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then( data  => {
        console.log(data,'data dari axios')
        console.log(`success delete porduct wiht ${data} `)
        })
        .catch(err => {
        console.log(err, err.message)
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
