<template>
  <div class="about2">
    <h3>cabout</h3>
    <p>{{$store.state.a.num}}</p>
    <p>{{$store.state.b.val}}</p>
    <!-- <p>{{revsers}}</p> -->
    <button @click="del">-</button>
    {{num2}}
    <button @click="add">+</button><br>
    {{re}}
    
  </div>
</template>
<script>
import {mapGetters,mapMutations,mapState} from 'vuex';
export default {
  // created(){
  //   console.log(this.$store);
  // },
  methods:{
      ...mapMutations(['a/CHANGE_NUM2']),
      del(){
        this['a/CHANGE_NUM2']('DEL')
      },
      add(){
        this['a/CHANGE_NUM2']('ADD')
      }
  },
  computed:{
    ...mapState({
      num2:state=>state.a.num2
    }),
    ...mapGetters({
        re:'b/revsers'
    })
  }
}
</script>
