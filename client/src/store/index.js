import Vue from 'vue'
import Vuex from 'vuex'
import product from '../axios/axiosInstance'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allDatas: []
  },
  mutations: {
    FETCH_DATA (state, payload) {
      state.allDatas = payload
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
    }
  },
  modules: {
  }
})
