import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '@/views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '@/views/LoginView.vue')
  },
  {
    path: '/detail/:articleId',
    name: 'detail',
    component: () => import( '@/views/DetailView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
