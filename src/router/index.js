import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: 'users'
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import('../views/Favorite')

  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Search')

  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
