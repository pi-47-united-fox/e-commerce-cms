import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    edit: {}
  },
  mutations: {
    getData (state, payload) {
      state.products = payload
    },
    putData (state, payload) {
      state.edit = payload
    }
  },
  actions: {
    fetchProduct (context) {
      console.log(context)
      axios({
        methods: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('getData', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    login (context, payload) {
      // console.log(payload, '<<<<<<<<payload dari store>>>>>>>>')
      return axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    }
  }
  // editProduct (context) {
  //   axios({
  //     method: 'PUT',
  //     url: `/products/${context.id}`,
  //     data: {
  //       name: context.name,
  //       image_url: context.image_url,
  //       price: context.price,
  //       stock: context.stock
  //     },
  //     headers: {
  //       access_token: localStorage.getItem('access_token')
  //     }
  //   })
  //     .then(({ data }) => {
  //       context.commit('edit')
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
})
