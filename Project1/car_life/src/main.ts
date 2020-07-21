import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// 重置浏览器样式
import '@/scss/_reset.scss';
// 引入composition-api
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
