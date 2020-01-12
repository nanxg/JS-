<template>
  <div>
    <input type="text" :value="12312" ref="txt" @blur="blur"><br>
    <button @click="add">非异步 {{ num }}</button>
    <button @click="add2">异步{{num}}</button>
    <button @click="aaa">触发aaa</button>
    <router-link to="/about">去关于</router-link><br>
    {{vv}}
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
export default {
  computed:{
    //如果有命名空间，那么mapGetters、mapState要用对象
    // ...mapState(['a/num','b/val']), //错误
    ...mapState({
      num:state=>state.a.num,
      val:state=>state.b.val
    }),
    // ...mapGetters(['revsers']),
    //如果有命名空间，那么mapGetters、mapState要用对象
    ...mapGetters({
      vv:'b/revsers'
    }),
  },
  methods:{
    // ...mapMutations(['a/increment']),
    ...mapMutations(['a/increment','b/changeval','b/aaa']),
    ...mapActions(['a/asyncIncrement']),
    
    add(){
      // this.increment(); // 原方法
      // this['a/increment'](); //使用命名空间的方法
      console.log(this['a/increment'])
      this['a/increment']();
    },
    add2(){
      // this.asyncIncrement(); // 原方法
      this['a/asyncIncrement'](); //使用命名空间的方法
    },
    aaa(){
      this['b/aaa']();
    },
    blur(){
      // this.changeval(this.$refs.txt.value); // 原方法
      this['b/changeval'](this.$refs.txt.value); //使用命名空间的方法
    }
  }
}
</script>

<style scoped>

</style>