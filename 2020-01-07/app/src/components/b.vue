<template>
    <div>
        <h1>This is b page</h1>
        <router-link to="/b/1">B1</router-link> |
        <router-link to="/b/2">B2</router-link>
        <div>
            <h2 v-if="$route.params.id == 1">欢迎老大回来</h2>
            <p v-if="$route.params.id == 2">小弟辛苦了</p>
        </div>
        {{$route.params.id}}
    </div>
</template>

<script>
    export default {
        created() {
            console.log('foo-created',this.$route.params);
        },
        beforeRouteUpdate (to, from, next) {
            console.log('路由切换了')
            next();
        },
    }
</script>

<style scoped>

</style>