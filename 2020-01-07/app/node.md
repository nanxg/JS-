
    $route
    获取路由的信息（属性）

    this.$route.parmas

    $router
    跳转路由的方法(方法)

    动态路由:
      主体一样，但是部分内容不一样，可以使用动态路由
      写法:
        /about/:id 匹配下面几种路由(这个id是自定义的)
          /about/1
          /about/2
          ...

      使用:
        $route.params.id   
        切换的时候不会触发一些钩子函数，比如created，可以使用watch监听

        watch:{
          '$route'(){

          }
        }


    嵌套路由:
      在路由配置中使用children:[{path:'x'}]  匹配的是  /parent/x
          嵌套的子路由的path 不要加 / 不然就不匹配
      注意的是parent组件中需要写上router-view 要不然子组件渲染不出来
      如果进入parent下没有指定的children,又想默认添加一个组件，可以在path上写个''

    
    path: '/user-*'  -> 会匹配以 `/user-` 开头的任意路径
        当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分

    编程导航:
      $router.push()  -> 跳转
      $router.replace()  -> 替换路由，跳转之后不能后退到上一个路径(因为被替换掉了)
      $router.go()  -> 前进后退

      可以传字符串和对象 
        '/'
        {
          path:'/'      // 跳转到路径
          name:'home',  // 跳转到命名的路由
          query:{
            name:'白晓'   -> /?name=白晓
          },
          params:{
            nn:'白晓'  -> 路由上不会显示nn，但是可以通过$route.params.nn去获取
          }
        }

      重定向:
        { path: '/a', redirect: { name: 'foo' }}

        { path: '/a', redirect: to => {
            // 方法接收 目标路由 作为参数
            // return 重定向的 字符串路径/路径对象
        }}

      路由传参:
        如果 props 被设置为 true，route.params 将会被设置为组件属性。

        可以在路由配置项中配置一个props,如果为true，那么子组件可以通过
        props去接收parmas参数
          可以看Home.vue中的 p4

        如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。

        如果创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

    导航守卫

        next(); 执行之后的路由跳转
        next(false) 中断路由跳转
        next('/') 等同于push  或者使用  next({ path: '/' })

        如果有全局和局部，那么全局优先级大

        全局的beforeEach(要切换路由的时候触发)

        组件中的beforeRouteLeave 离开组件的时候触发
        复用组件使用beforeRouteUpdate去进行监听

        路由中的beforeEnter 进入路由的时候触发