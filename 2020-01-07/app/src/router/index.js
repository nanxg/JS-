import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/myHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'home', // 路由命名
    component:Home
  },
  // 动态路由
  {
    path:'/about/:username/id/:id',
    component:()=> import('../views/myAbout.vue') //懒加载，只有调用他才加载，避免浪费资源
  },
  // 嵌套路由
  {
    path:'/public',
    component:()=> import('../views/myPublic.vue'),
    meta:{test:'aaa'},
    children:[
      {
        path:'pub1',
        component:()=> import('../views/pub1.vue')
      },
      {
        path:'pub2',
        component:()=> import('../views/pub2.vue')
      },
      {
        path:'',  //如果/public下没有指定的children,如需默认添加一个组件，可以在path上写个''
        component:()=> import('../views/pub.vue')
      },
    ]
  },
  // 编程导航
  {
    path:'/login',
    component:()=> import('../views/myLogin.vue')
  },
  // 重定向
  {
    path:'/ppp',
    // redirect:{ name: 'home' }
    redirect:to=>{
      console.log(to) 
      return '/public';
    }
  },
  {
    path:'/pro1',
    name:'pro1',
    props:true,
    component: () => import('../views/pro1.vue')
  },
  {
    path:'/pro2',
    name:'pro2',
    //当做一个传递数据的钩子
    props:(route)=>({
      n:route.params.nn
    }),
    component: () => import('../views/pro2.vue')
  },
  // 通配符，匹配所有路径(按顺序由上到下匹配，上边有的路径不会走到这里)
  {
    path:'*',
    component:()=> import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, 
  routes
})

export default router  // 导出，由main.js导入
