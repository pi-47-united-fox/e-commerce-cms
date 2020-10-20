import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    chosenPlayer: {}
  },
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      state.players = payload
    },
    EDIT_PLAYER (state, payload) {
      state.chosenPlayer = payload
      router.push(`/category/${payload.id}`)
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios
        .get('http://localhost:3000/products', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          commit('FETCH_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login (context, payload) {
      axios
        .post('http://localhost:3000/login', {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$router.push({ path: "/footballPlayers" })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addPlayer (context, payload) {
      axios
        .post('http://localhost:3000/products', {
          name: payload.name,
          image_url: payload.image_url,
          price: Number(payload.price),
          stock: 1,
          category: payload.category

        },
        {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          // console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editPlayer (context, payload) {
      axios
        .put(`http://localhost:3000/products/${payload.id}`, {
          name: payload.name,
          image_url: payload.image_url,
          price: Number(payload.price),
          stock: 1,
          category: payload.category
        },
        {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deletePlayer (context, payload) {
      axios
        .delete(`http://localhost:3000/products/${payload}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          this.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
