import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VeeValidate from "vee-validate";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

// Vue.use(VeeValidate, {
//   inject: true,
//   fieldsBagName: "veeFields",
//   errorBagName: "veeErrors"
// });


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
