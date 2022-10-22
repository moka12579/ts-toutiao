import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload, Toast } from 'vant';
import {init} from "@/utils/init";


Vue.config.productionTip = false
Vue.use(Lazyload)
Vue.use(Toast)
let vm = new Vue({
  router,
  store,
  render: h => h(App)
})
init().then(res => {
  vm.$mount('#app')
}).catch(err => {
  Toast.fail("出错！")
})
