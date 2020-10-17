import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'
import Swal from "sweetalert2";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    dataEdit: {}
  },
  mutations: {
    FETCH_DATA(state, payload) {
      state.products = payload
    },
    POLULATE_DATA_EDIT(state,payload){
      state.dataEdit=payload
    }
  },
  actions: {
    login(context, payload) {
      const { email, password } = payload
      // console.log(payload, '<---ini payload login store')
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: email,
          password: password
        }
      })
        .then(({ data }) => {
          // console.log(data, '<---ini data di login store')
          localStorage.setItem('access_token', data.access_token)
          context.dispatch('fetchData')
          router.push('/')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchData(context) {
      // console.log('ini fetch data')
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('FETCH_DATA', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    addData({ dispatch }, payload) {
      const { name, imageurl, price, stock } = payload
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/products ',
        data: {
          name: name,
          image_url: imageurl,
          price: price,
          stock: stock
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          dispatch('fetchData')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    editData({ dispatch }, payload) {
      const { id, name, image_url, price, stock } = payload
      console.log(image_url);
      Axios({
        method: 'PUT',
        url: `http://localhost:3000/products/${payload.id} `,
        data: {
          name: name,
          image_url: image_url,
          price: price,
          stock: stock
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          Swal.fire(
            'yes!!!',
            'yor product has been updated',
            // 'question'
          )
          dispatch('fetchData')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteData({ commit, dispatch }, payload) {
      console.log(payload, '<----ini id di store')
      Axios({
        method: 'DELETE',
        url: `http://localhost:3000/products/${payload} `,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          dispatch('fetchData')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  modules: {
  }
})
