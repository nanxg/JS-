<template>
    <div>
        <!-- <button @click="$store.state.num++">{{num}}</button> -->
        <button @click="add">{{num}}</button>
        
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