import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
//     children:[
//       {
//         path:'vuex1',
//         component: () => import('../views/vuex1.vue')
//       },
//       {
//         path:'vuex2',
//         component: () => import('../views/vuex2.vue')
//       },
      
//     ]
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

export default new VueRouter({
  mode:'history',
  base:process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      children:[
        {
          path:'vuex1',
          component: () => import('../views/vue-state.vue')
        },
        {
          path:'vuex2',
          component: () => import('../views/vue-mutations-action.vue')
        },
        {
          path:'vuex3',
          component: () => import('../views/vue-getters.vue')
        },
      ]
    },
    {
      path: '/hw',
      name: 'hello',
      component: () => import('../components/HelloWorld.vue')
    }
  ]
})
