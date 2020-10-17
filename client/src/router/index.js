import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../views/Product.vue'
import Login from '../views/LoginForm.vue'
import editPage from '../views/EditForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Product',
    name: 'Product',
    component: Product
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/editPage/:id',
    name: 'editPage',
    component: editPage
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "addProduct" */ '../views/AddNewProduct.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && localStorage.access_token) {
    next({ path: '/Product' })
  } else if (to.name !== 'Login' && !localStorage.access_token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
