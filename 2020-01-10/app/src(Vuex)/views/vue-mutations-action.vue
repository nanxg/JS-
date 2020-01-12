<template>
    <div>
        <h4>Vuex-mutations-action</h4>
        <button @click="add">非异步{{num}}</button>
        <button @click="add2">异步{{num}}</button>
    </div>
</template>

<script>
/* 
    mutations 更改Vuex的store中的状态的唯一方法
        同步方法
    
    Action 类似于 mutation，不同在于：
        Action 提交的是 mutation，而不是直接变更状态。
        Action 可以包含任意异步操作。
*/
    // 引入辅助函数
    import {mapState,mapMutations,mapActions } from 'vuex'
    export default {
        computed:{
        ...mapState(['num']),
        // num(){
        //     return this.$store.state.num;
        // }
    },
        methods:{
            ...mapMutations(['increment']),
            ...mapActions(['asyncinc']),
            add(){
                this.increment(1)
            },
            add2(){
                // this.$store.commit('asyncinc',2); // commit调用vuex的mutations，无法调用action
                // this.$store.dispatch('asyncinc',2); // 调用vuex的action需用dispatch
                this.asyncinc(2)
            }
        }
    }
</script>

<style scoped>

</style>