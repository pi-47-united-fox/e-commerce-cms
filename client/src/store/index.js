import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // errMessage: ''
    fetchProduct: '',
    dataEdit: {}
  },
  mutations: {
    // LOGIN (state, data) {
    //   state.errMessage = data
    // }
    FETCHPRODUCT(state, data) {
      state.fetchProduct = data
    },
    ADDPRODUCT(state, data) {
      state.fetchProduct.push(data)
    },
    EDITPAGE(state, data) {
      state.dataEdit = data
    }
  },
  actions: {
    login(context, payload) {
      // console.log(payload, " <<<<<<")
      return axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
      .then(({ data }) => {
        // let msg = ""
        // context.commit('LOGIN', msg)
        // this.$router.push({path: "/Product"})
        localStorage.setItem("access_token", data.access_token)
        })
        .catch(err => {
          let msg = err.response.data.errors[0]
          // context.commit('LOGIN', msg)
          console.log(msg);
        })
      
    },
    fetchProduct(context) {
      axios({
        method: 'GET',
        url: '/product',
        headers: {
          access_token : localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
        context.commit("FETCHPRODUCT", data)
        })
        .catch(err => {
        console.log(err.response);
      })
    },
    addProduct(context, payload) {
      console.log(payload, " <<<<<");
      axios({
        method: 'POST',
        url: '/product',
        headers: {
          access_token : localStorage.getItem("access_token")
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        }
      })
        .then(({ data }) => {
          context.commit('ADDPRODUCT', data)
          this.$router.push({path: "/Product"})
        })
        .catch(err => {
        console.log(err.response.data.errors);
      })
    },
    editPage(context, payload) {
      return axios({
        method: 'PUT',
        url: `/product/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        }
      })   
    },
    deleteProduct(context, id) {
      return axios({
        method: 'delete',
        url: `/Product/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })

    }
  },
  modules: {
  }
})

