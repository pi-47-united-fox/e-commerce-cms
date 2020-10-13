import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dash',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'pages',
        name: 'Pages',
        component: () => import(/* webpackChunkName: "pages" */ '../components/DashPages.vue')
      },
      {
        path: 'products',
        name: 'Product',
        component: () => import(/* webpackChunkName: "products" */ '../components/DashProducts.vue')
      },
      {
        path: 'banners',
        name: 'Banners',
        component: () => import(/* webpackChunkName: "banners" */ '../components/DashBanners.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
