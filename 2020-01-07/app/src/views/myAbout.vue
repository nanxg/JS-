<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/about/nxg/id/1">ABOUT1</router-link> |
    <router-link to="/about/pl/id/2">ABOUT2</router-link>
    <div>
        用户:{{$route.params.username}}
        <h2 v-if="$route.params.id == 1">欢迎老大回来</h2>
        <p v-if="$route.params.id == 2">小弟辛苦了</p>
    </div>

    {{$route.params.id}}
  </div>  
</template>
<script>
// @ is an alias to /src

export default {
  data(){
    return {
      num:0
    }
  },
  // 动态路由 createded只在其他路由跳过来时有用，自己动态之间跳转无效；可用watch监听'$route'
  created(){
    this.num = 1;
    console.log(this.$route);
    if(this.$route.params.id === '1'){
      setTimeout(()=>{
        console.log('created-get1');
      },1000)
    }else if(this.$route.params.id === '2'){
      setTimeout(()=>{
        console.log('created-get2');
      },1000)
    }
  },

  watch:{
    '$route'(to,from){
      console.log(to,from);
      if(to.params.id ==='1'){
        setTimeout(()=>{
          console.log('watch-get1');
        },1000)
      }else if(to.params.id ==='2'){
        setTimeout(()=>{
          console.log('watch-get2');
        },1000)
      }
    }
  }
}
</script>

