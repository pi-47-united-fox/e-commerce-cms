import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/LoginForm.vue'
import AddForm from '../views/AddForm.vue'
import EditForm from '../views/EditForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-product',
    name: 'AddForm',
    component: AddForm
  },
  {
    path: '/edit-product/:id',
    name: 'EditForm',
    component: EditForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach ((to, from, next) => {
  if((to.name === 'Login') && localStorage.access_token){
    next({path:'/home'})
  }
  else if((to.name !== 'Login') && !localStorage.access_token){
    next({path:'/'})
  }
  else{
    next()
  }
})

export default router
