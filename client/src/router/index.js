import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Products',
    component: () => import(/* webpackChunkName: "login" */ '../views/AllProducts.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: () => import(/* webpackChunkName: "add-product" */ '../views/AddProduct.vue')
  },
  {
    path: '/edit-product',
    name: 'EditProduct',
    component: () => import(/* webpackChunkName: "edit-product" */ '../views/EditProduct.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/' && !localStorage.getItem('access_token')) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
