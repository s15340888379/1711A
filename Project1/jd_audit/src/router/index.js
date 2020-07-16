import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入一级路由
import Main from '@/views/Main.vue'
import PhoneUrge from '@/views/PhoneUrge.vue'
import UrgeAward from '@/views/UrgeAward.vue'

// 引入二级路由
import My from '@/views/main/My.vue'
import Home from '@/views/main/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/main/home'
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [{
      path: '/main/home',
      component: Home
    }, {
      path: '/main/my',
      component: My
    }]
  },
  {
    path: '/phoneUrge',
    component: PhoneUrge
  },
  {
    path: '/urgeAward',
    component: UrgeAward
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
