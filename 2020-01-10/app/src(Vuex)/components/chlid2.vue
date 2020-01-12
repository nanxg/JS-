<template>
  <div class="about">
    <h4>This is child 2</h4>
    <button @click="add">{{num}}</button>
    <button @click="add2">和1关联</button>
  </div>
</template>

<script>
import {bus} from '../bus/index'

    export default {
        data(){
            return {
            num:0
            }
        },
        created(){
            //**订阅**change2事件
            bus.$on('change2',(val)=>{
            this.num = val;
            })
        },
        methods:{
            add(){
            this.num++
            },
            add2(){
                // 调用兄弟组件的事件
                bus.$emit('change1',this.num);
            }
        }
    }
</script>

<style scoped>

</style>