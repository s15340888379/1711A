import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, {Toast} from 'vant';
import 'vant/lib/index.css';
// 挂载Mock.js
import '@/mock/index.js'
import axios from 'axios'

axios.interceptors.response.use((response)=>{
  return response.data;
})
Vue.prototype.$axios = axios;

Vue.use(Vant);

Vue.config.productionTip = false
// 全局错误处理
Vue.config.errorHandler = function(){
  console.log('errorHandler arguments...', arguments, arguments[0].toString())
  Toast.fail(arguments[0].toString())
}

// 全局警告处理
Vue.config.warnHandler = function(){
  console.log('warnHandler arguments...', arguments)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
