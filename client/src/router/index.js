import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AddForm from '../views/AddForm.vue'
import EditForm from '../views/EditForm.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/addForm',
    name: 'AddForm',
    component: AddForm
  },
  {
    path: '/editForm/:id',
    name: 'EditForm',
    component: EditForm
  },
  {
    path: '/detail/:name',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.access_token) {
    next({path: '/'})
  }
  else if (to.name !== 'Login' && !localStorage.access_token) {
    next({ path: 'Login' })
  } else next()
})

export default router
