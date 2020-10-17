import Vue from 'vue'
import Vuex from 'vuex'
import product from '../axios/axiosInstance'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allDatas: [],
    findById: {},
    findByName: {}
  },
  mutations: {
    FETCH_DATA (state, payload) {
      state.allDatas = payload
    },
    FIND_BY_ID (state, payload) {
      state.findById = payload
    },
    FIND_BY_NAME (state, payload) {
      state.findByName = payload
    }
  },
  actions: {
    fetchAll ({ commit }) {
      product
        .get('/product')
        .then(({ data }) => {
          commit('FETCH_DATA', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login ({ commit }, payload) {
      product
        .post('/login', {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push({ path: '/' })
        })
    },
    addProduct ({ dispatch }, payload) {
      product
        .post('/product', {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category
        },
        {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          dispatch('fetchAll')
          router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct ({ dispatch }, payload) {
      product
        .put(`/product/${payload.id}`, {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category
        },
        {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          dispatch('fetchAll')
          router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteHandler ({ dispatch }, payload) {
      product
        .delete(`/product/${payload}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          dispatch('fetchAll')
          router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    findById ({ commit,state }, payload) {
      let edited = state.allDatas.filter(el=>{
        return el.id == payload
      })

      let obj = {
        id: edited[0].id,
        name: edited[0].name,
        image_url: edited[0].image_url,
        price: edited[0].price,
        stock: edited[0].stock,
        category: edited[0].category
      }

      commit('FIND_BY_ID', obj)
    },
    findByName ({ commit,state }, payload) {
      let chosenName = state.allDatas.filter(el=>{
        //console.log(el.name, payload, 'dasdsdsaad')
        return el.name == payload
      })
      console.log(chosenName,'sdsdsds')

      let obj = {
        id: chosenName[0].id,
        name: chosenName[0].name,
        image_url: chosenName[0].image_url,
        price: chosenName[0].price,
        stock: chosenName[0].stock,
        category: chosenName[0].category
      }
      console.log(obj)
      commit('FIND_BY_NAME', obj)
    }
  },
  modules: {
  }
})
