import Vue from 'vue'
import VueRouter from 'vue-router'
import BeforEach from '../components/beforeEach.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'BeforEach', // 路由命名
    component:BeforEach,
  },
  // 测试组件的守卫
  {
    path:'/foo',
    component:()=> import('../components/foo.vue'),
    children:[
      {
        path:'/foo2',
        component:()=> import('../components/foo2.vue'),
        meta:{requiresAuth:true}, // 路由元信息，遍历 $route.matched 来检查路由记录中的 meta 字段
        // 路由守卫
        beforeEnter: (to, from, next) => {
          // alert('beforeEnter')
          console.log(to);
          if(to.matched.some(i=>i.meta.requiresAuth)){
            next('/')
          }
          next()
        }
      },
      {
        path:'/foo3',
        component:()=> import('../components/foo3.vue'),
        meta:{requiresAuth:true} // 路由元信息，遍历 $route.matched 来检查路由记录中的 meta 字段
      },
    ]
  },
  // 动态路由，测试beforeRouteUpdate
  {
    path:'/b/:id',
    component:()=> import('../components/b.vue')
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
});
// 全局守卫，切换路由的时候，跳转之前触发
router.beforeEach((to,from,next)=>{
  // console.log(to,from,next);
  if(to.fullPath === '/foo'){
    // alert('想看？')
    // next(false);
    next()
    // next({ path: '/',replace:true });
  }else{
    next();
  }
  // next();
});
// 跳转后触发
// router.afterEach((to, from) => {
//   alert(from.path+'到'+to.path)
//   // console.log('afterEach');
//   // console.log(to,from);
// });

export default router  // 导出，由main.js导入
