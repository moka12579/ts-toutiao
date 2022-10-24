import Vue from 'vue'
import VueRouter, {NavigationGuardNext, Route, RouteConfig} from 'vue-router'
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
  },
  {
    path: '/my',
    name: 'my',
    component: () => import( '@/views/MyView.vue')
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: '/result/:value',
    name: "result",
    component: () => import("../views/ResultView.vue")
  },
  {
    path: '/browseHistory',
    name: "browseHistory",
    component: () => import("../views/PublishHistoryView.vue")
  },
  {
    path: "/setup",
    name: "setup",
    component: () => import("../views/SetupView.vue")
  },
  {
    path: "/forget/:smsType",
    name: "forget",
    component: () => import("../views/RegisterView.vue")
  },
  {
    path: "/updatePwd",
    name: "updatePwd",
    component: () => import("../views/UpdatePwd.vue")
  },
  {
    path: "/updateInfo",
    name: "updateInfo",
    component: () => import("../views/UpdateInfo.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to:Route,form:Route,next:NavigationGuardNext<Vue>):void => {
  const whiteList = ["/login","/register","/","/forget"]
  if (whiteList.findIndex((v:string):boolean => v === to.path) !== -1) return next()
  const {token} = localStorage
  if(!token){
    next("/login")
  }
  next()

})

export default router
