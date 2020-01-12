<template>
    <div>
        <h4>Vuex-state</h4>
        <!-- <button @click="$store.state.num++">{{num}}</button> -->
        <button @click="add">{{num}}</button>
        
    </div>
</template>

<script>
/* 
    state 单一状态树 在调试的过程中能轻易地取得整个当前应用的状态
        用来存放数据
*/
// 引入辅助函数
import {mapState,mapMutations,mapActions } from 'vuex'
export default {
    // 不同的写法
    /* ① */
    // computed:mapState({
    //     num:state=>state.num
    // }),
    /* ② */
    // computed:mapState(['num']),

    computed:{
        /* ③ */
        // num(){
        //     return this.$store.state.num;
        // },
        /* ④ */
        // ...mapState({
        //     num:state=>state.num
        // }),
        /* ⑤ 常用 */
        ...mapState(['num']),
    },
    methods:{
        add(){
            // this.$store.commit('increment',{n:5}) 
            this.$store.commit({
                type:'increment',
                n:5
            })
        }
    }
}
</script>

<style scoped>

</style>