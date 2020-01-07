<template>
  <div class="home">
    {{$route.query.name}} {{$route.params.un}}:欢迎你 
    <p></p>
    <img alt="Vue logo" src="../assets/logo.png">
    <hr>
    动态路由
    <router-link to="/about/nxg/id/1">ABOUT1</router-link> |
    <router-link to="/about/pl/id/2">ABOUT2</router-link>
    <hr>
    路由传参
    <router-link tag="button" :to="{name:'pro1',params:{n:'pro1'}}">pro1</router-link>
    <router-link tag="button" :to="{name:'pro2',params:{nn:'pro2'}}">pro2</router-link>
  </div>
</template>

<script>
// @ is an alias to /src


export default {

}
</script>
