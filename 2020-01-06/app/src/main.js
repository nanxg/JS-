import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' // 引入vue-router

Vue.use(VueRouter); // 使用

Vue.config.productionTip = false

import HelloWorld from './components/HelloWorld.vue'
import MyHome from './components/home.vue'
import MyAbout from './components/about.vue'
import MyPublic from './components/public.vue'

const routes =[
  //  path:'指定路径',component:指定路径响应的组件
  { path:'/',component:HelloWorld },
  { path:'/Home',component:MyHome},
  { path:'/About',component:MyAbout},
  { path:'/Public',component:MyPublic}
]


const router = new VueRouter({
  mode:'history', // 默认mode为hash
  routes
})

new Vue({
  router,
  render: h => h(App),
  
}).$mount('#app') // #app为根节点，index.html中的id为app的div
