<template>
  <div class="about">
    {{$store.state.num}}
    <h1>This is an about page</h1>
    <router-link to="/about/vuex1" tag="button">vue-state</router-link>
    <router-link to="/about/vuex2" tag="button">vue-mutations-action</router-link>
    <router-link to="/about/vuex3" tag="button">vue-getters</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>
