<template>
  <div class="about">
    <h4>This is child 1</h4>
    <button @click="add">{{num}}</button>
    <!-- <button @click="add2">和2关联</button> -->
  </div>
</template>

<script>
import {bus} from '../bus/index'
console.log(bus);

    export default {
        data(){
            return {
                num:0
            }
        },
        created(){
            //**订阅**change1事件，把num改成传入的值
            bus.$on('change1',(val)=>{
                this.num = val;
            })
        },
        methods:{
            add(){
                this.num++
                bus.$emit('change2',this.num); // 同步变更
            },
            add2(){
                // 调用兄弟组件的事件。点击1的时候改变2
                bus.$emit('change2',this.num);
            }
  }
    }
</script>

<style scoped>

</style>