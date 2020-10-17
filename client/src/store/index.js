import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: {
      errorLogin: false,
      errorLoginMessage: '',
      loggedIn:false
    },
    dataProduct:[],
    dataEdit:{},
    errorAdd:false,
    errorAddMessage:''
  },
  mutations: {
    errorLogin (state, payload) {
      state.loginStatus.errorLogin = true
      state.loginStatus.errorLoginMessage = payload
    },
    successLogin (state,payload) {
      state.loginStatus.errorLogin = false
      state.loginStatus.errorLoginMessage = ''
      state.loginStatus.loggedIn = true

    },
    keepLogin(state,payload){
      if(localStorage.access_token){
        state.loginStatus.loggedIn = true
      }else{
        state.loginStatus.loggedIn = false
      }
    },
    logoutHandler(state,payload){
      localStorage.clear()
      state.loginStatus.loggedIn = false
      router.push({path:'/login'})
    },
    getDataProduct(state,payload){
      state.dataProduct = payload
    },
    dataEdit(state,payload){
      state.dataEdit = payload
      router.push({path:'/editproduct'})   
    },
    errorAdd(state,payload){
      state.errorAdd = true
      state.errorAddMessage = payload
    }
  },
  actions: {
    loginHandler ({ commit }, payload) {
      axios
        .post('/login', {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          commit('successLogin')
          router.push({ path: '/' })
        })
        .catch(err => {
          commit('errorLogin', err.response.data.message)
        })
    },
    getData ({ commit }, payload) {
      axios
        .get('/product', {
          headers:{
            access_token:localStorage.access_token
          }
        })
        .then(({data})=>{
          commit('getDataProduct', data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    addProduct ({ commit }, payload){
      axios
        .post('/product', payload ,{
          headers:{
            access_token:localStorage.access_token
          }
        })
        .then(result=>{
          router.push({path:'/'})
        }).catch(err=>{
          commit('errorAdd', err.response.data.message)
        })
    },
    deleteProduct({commit,dispatch}, payload){
      axios
        .delete(`/product/${payload}`,{
          headers:{
            access_token:localStorage.access_token
          }
        })
        .then(result=>{
          dispatch('getData')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    editProduct({commit,dispatch},payload){
      let id = payload.id
      let editedData = {
        name:payload.name,
        image_url:payload.image_url,
        price:payload.price,
        stock:payload.stock
      }

      axios
        .put(`/product/${id}`,editedData,{
          headers:{
            access_token:localStorage.access_token
          }
        })
        .then(result=>{
          dispatch('getData')
          router.push({path:'/'})
        })
        .catch(err=>{
          console.log(err)
        })
    }

  },
  modules: {
  }
})
