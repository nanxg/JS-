<template>
    <footer class="footer">
        <span class="todo-count">
          <strong>{{cnum}}</strong>
          <span>条未选中</span>
          </span>
          <ul class="filters">
              <li>
                  <a  href="#/all" 
                      :class="a===0?'selected':''"
                      @click="sele(0)"
                  >全部</a>
              </li>
              <li>
                  <a  href="#/unchecked" 
                      :class="a===1?'selected':''"
                      @click="sele(1)"
                  >未选中</a>
              </li>
              <li>
                  <a  href="#/checked"
                      :class="a===2?'selected':''"
                      @click="sele(2)"
                  >已选中</a>
              </li>
          </ul>
      </footer>
</template>

<script>
    export default {
        data(){
            return {
                a:0
            }
        },
        methods:{
            sele(a){
                // this.a = a;
                this.$emit('sel',a);
            }
        },
        props:['cnum']
    }
</script>

<style lang="scss" scoped>

</style>