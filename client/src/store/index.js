import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    GET_PRODUCTS(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    getProducts(context, payload) {
      axios({
        method: "GET",
        url: "http://localhost:3000/products",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2MDI0OTc1MDR9.eP4j1Dp3sfaDbDaa_ByU6lpwQJWGf_Ryh5ya602lfYc"
        }
      })
        .then(result => {
          context.commit("GET_PRODUCTS", result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getters: {},
  modules: {}
});
