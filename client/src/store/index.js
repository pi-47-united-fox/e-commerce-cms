import Vue from 'vue'
import Vuex from 'vuex'
import cms from '../config/cmsapi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminEmail: '',
    isLogedIn: false,
    products: [],
    categories: [],
    banners: []
  },
  mutations: {
    LOGIN (state, token) {
      state.isLogedIn = true
      localStorage.setItem('access_token', token)
    },
    SIGN_OUT (state) {
      state.isLogedIn = false
      return localStorage.removeItem('access_token')
    },
    FETCH_PRODUCTS (state, products) {
      state.products = products
    },
    FETCH_BANNERS (state, banners) {
      state.banners = banners
    },
    UPDATE_ONE_PRODUCT (state, updated) {
      // @note disini penginnya itu update data yang idnya sama, jadi biar gak ngefetch API terus kalau ada satu perubahan saja
      state.products.map(e => {
        if (e.id === updated.id) {
          e.name = updated.name
          e.image_url = updated.image_url
          e.price = updated.price
          e.stock = updated.stock
          e.CategoryId = updated.CategoryId
        }
      })
    },
    DELETE_ONE_PRODUCT (state, payload) {
      // @note disini harus nerima data id element yang didelete agar setelah delete mengemat ngefetch API setelah di delete
      // @todo menghapus satu array yang id nya == payload.id
    },
    ADD_ONE_PRODUCTS (state, payload) {
      // @note disini harus menambah data Product sesaui balikan (payload) agar menghemat fetch API
      // @todo push satu data di array products dengan data balikan (payload)
      state.products.push(payload)
      // state.products.push({
      //   name = payload.name,
      //   image_url = payload.image_url,
      //   price = payload.price,
      //   stock = payload.stock,
      //   Category =
      // })
    }
  },
  actions: {
    login ({ commit }, input) {
      /**
       * @note @input berbentuk object
       */
      return cms
        .post('/login', {
          email: input.email,
          password: input.password
        }).then(({ data }) => {
          console.log('success -> response: ', data)
          console.log('access_token', data.access_token)
          commit('LOGIN', data.access_token)
        }).catch(err => {
          console.log('error -> ', err)
        })
    },
    fetchProducts ({ commit }) {
      return cms
        .get('/products', {
          headers: {
            access_token: localStorage.access_token
          }
        }).then(({ data }) => {
          // console.log (data)
          commit('FETCH_PRODUCTS', data)
        }).catch(err => {
          console.log('Error dari action fetchProducts: ', err)
        })
    },
    addProduct ({ commit }, dataInput) {
      const data = {
        name: dataInput.name,
        image_url: dataInput.image_url,
        price: dataInput.price,
        stock: dataInput.stock,
        categoryName: dataInput.Category.categoryName || 'Uncategorized'
      }
      console.log(data)
      return cms
        .post('/products', data, {
          headers: {
            access_token: localStorage.access_token
          }
        }).then(({ data }) => {
          // @audit Category name masih belm bisa include returning
          console.log('dari action', data)
          commit('ADD_ONE_PRODUCTS', data)
        }).catch((err) => {
          console.log(err)
        })
    },
    editProduct ({ commit }, dataInput) {
      /**
       * @note @dataInput berbentuk object
       */
      return cms
        .put('/product/' + dataInput.id, {
          name: dataInput.name,
          image_url: dataInput.image_url,
          price: dataInput.price,
          stock: dataInput.stock,
          CategoryId: dataInput.CategoryId
        }, {
          headers: {
            access_token: localStorage.access_token
          }
        }).then(({ data }) => {
          commit('UPDATE_ONE_PRODUCT', data)
        }).catch((err) => {
          console.log(err)
        })
    },
    deleteProduct ({ commit }, productId) {
      /**
       * @note type of @productId => Integer
       */
      return cms
        .delete('/products/' + productId, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          commit('DELETE_ONE_PRODUCT', data)
        }).catch((err) => {
          console.log(err)
        })
    },
    fetchBanners ({ commit }) {
      return cms
        .get('/banners', {
          headers: {
            access_token: localStorage.access_token
          }
        }).then(({ data }) => {
          commit('FETCH_BANNERS', data)
        }).catch(err => {
          console.log('Error dari action fetchBanners: ', err)
        })
    }
  },
  getters: {
    getProductById: (state) => (id) => {
      // @todo untuk menghemat get API data by id maka dibuat get data local tanpa HIT get ke API
      return state.products.find(p => p.id === id)
    }
  },
  modules: {

  }
})
