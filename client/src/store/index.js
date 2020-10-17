import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    display_name: ""
  },
  mutations: {
    GET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_DISPLAY_NAME(state, payload) {
      state.display_name = payload;
    },
    UPDATE_PRODUCTS(state, payload) {
      state.products = [];
    }
  },
  actions: {
    getProducts(context, payload) {
      axios({
        method: "GET",
        url: "http://localhost:3000/products",
        headers: { access_token: localStorage.access_token }
      })
        .then(result => {
          if (result.status === 200) {
            context.commit("GET_PRODUCTS", result.data);
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteProduct(context, { id }) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/products/${id}`,
        headers: { access_token: localStorage.access_token }
      })
        .then(result => {
          if (result.status === 200) {
            context.commit("UPDATE_PRODUCTS");
            context.dispatch("getProducts");
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addProduct(context, payload) {
      axios({
        method: "POST",
        url: "http://localhost:3000/products",
        headers: {
          "Content-type": "application/json",
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(result => {
          if (result.status === 201) {
            router.push({ path: "/home" });
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editProduct(context, payload) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/products/${payload.id}`,
        headers: {
          "Content-type": "application/json",
          access_token: localStorage.access_token
        },
        data: payload.data
      })
        .then(result => {
          if (result.status === 200) {
            context.commit("UPDATE_PRODUCTS");
            context.dispatch("getProducts");
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    postLogin(context, payload) {
      axios({
        method: "POST",
        url: "http://localhost:3000/users/login",
        headers: {
          "Content-type": "application/json"
        },
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          if (result.status === 201) {
            context.commit("SET_DISPLAY_NAME", result.data.display_name);
            localStorage.setItem("access_token", result.data.access_token);
            router.push({ path: "/home" });
          } else {
            console.log("Wrong password/email");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getters: {},
  modules: {}
});
