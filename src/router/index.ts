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
    path: '/login',
    name: 'login',
    component: () => import( '@/views/LoginView.vue')
  },
  {
    path: '/detail/:articleId',
    name: 'detail',
    component: () => import( '@/views/DetailView.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import( '@/views/PublishArticleView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
