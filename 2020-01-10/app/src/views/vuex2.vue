<template>
    <div>
        <button @click="add">非异步{{num}}</button>
        <button @click="add2">异步{{num}}</button>
    </div>
</template>

<script>
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
                this.asyncinc(2)
            }
        }
    }
</script>

<style scoped>

</style>