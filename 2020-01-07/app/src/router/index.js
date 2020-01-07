import Vue from 'vue'
import VueRouter from 'vue-router'
import BeforEach from '../components/beforeEach.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'BeforEach', // 路由命名
    component:BeforEach
  },
  
  router.beforEach((to,from,next)=>{
    console.log(to,from,next);
    if(from.fullPath === '/b2' && to.fullPath === '/b1'){
      next('/p4');
      alert('全局')
    }else{
      next();
    }
  })
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
