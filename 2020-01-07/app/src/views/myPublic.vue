<template>
    <div>
        <p>嵌套路由</p>
        <router-link tag="button" to="/public/pub1">去pub1</router-link>
        <router-link tag="button" to="/public/pub2">去pub2</router-link>
        <!-- 嵌套路由的渲染位置 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>