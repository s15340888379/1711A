import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// 重置浏览器样式
import '@/scss/_reset.scss';
// 引入composition-api
import CompositionApi from '@vue/composition-api'
// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(CompositionApi)
Vue.config.productionTip = false;

// 错误处理
Vue.config.errorHandler = function(err) {
  console.log('err...', err);
}
// 警告处理
Vue.config.warnHandler = function(err) {
  console.log('warn...', err);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
