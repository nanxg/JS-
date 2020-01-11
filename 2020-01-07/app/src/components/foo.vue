<template>
    <div>
        <h3>this is foo</h3>
        <router-link to="/foo2" tag="button">FOO2</router-link>
        <router-link to="/foo3" tag="button">FOO3</router-link>
        <router-view />
    </div>
</template>

<script>
    export default {
        created() {
            console.log('foo-created',this.$route.params);
        },
        beforeRouteEnter (to, from, next) {
            console.log(to);
            console.log(from);
            alert('beforeRouteEnter')
            next()
        },
        beforeRouteUpdate (to, from, next) {
            console.log('路由切换了')
            next();
        },
        beforeRouteLeave (to, from, next) {
        let b = confirm('你真的要离开吗？');
            if (b) {
                next()
            } else {
                next(false)
            }
        }
    }
</script>

<style scoped>

</style>