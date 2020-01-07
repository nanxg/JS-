import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' // 导入vue-router

Vue.use(VueRouter); // 调用

Vue.config.productionTip = false

// 引入组件
import HelloWorld from './components/HelloWorld.vue'
import MyHome from './components/home.vue'
import MyAbout from './components/about.vue'
import MyPublic from './components/public.vue'

// 定义路由
const routes = [
  //  path:'指定路径',component:指定路径响应的组件
  { path:'/',component:HelloWorld },
  { path:'/Home',component:MyHome},
  { path:'/About',component:MyAbout},
  { path:'/Public',component:MyPublic}
]

// 创建router实例
const router = new VueRouter({
  mode:'history', // 默认mode为hash
  routes //传配置
})

// 创建和挂载根实例。
new Vue({
  router, //通过 router 配置参数注入路由，从而让整个应用都有路由功能
  render: h => h(App)
}).$mount('#app') // #app为根节点，index.html中的id为app的div
