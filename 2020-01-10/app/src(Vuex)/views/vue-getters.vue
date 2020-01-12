<template>
    <div>
        <h4>Vuex-getters</h4>
        <button @click="add">{{toDb}}</button>
    </div>
</template>

<script>
/* 
    getters 可以对数据进一步处理，类似于computed

    注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
*/
    // 引入辅助函数
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        computed: {
            ...mapGetters(['toDb'])
        },
        methods:{
            ...mapMutations(['increment']),
            add(){
                this.increment(3)
            }
        }
    }
</script>

<style scoped>

</style>