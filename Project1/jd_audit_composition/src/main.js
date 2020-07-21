import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入composition-api
import CompositionApi from '@vue/composition-api'
import Vant from 'vant'
import 'vant/lib/index.css'
// 挂载Mock.js
import '@/mock/index.js'
import axios from 'axios'

axios.interceptors.response.use((response) => {
  return response.data
})
Vue.prototype.$axios = axios

Vue.use(Vant)

Vue.use(CompositionApi)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
