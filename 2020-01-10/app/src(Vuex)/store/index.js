import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state 单一状态树 在调试的过程中能轻易地取得整个当前应用的状态；存放数据
  state: {
    num:0
  },
  /* 
    getters 可以对数据进一步处理，类似于computed

    注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
  */
  getters:{
    toDb(state){
        return state.num<10?'0'+state.num:''+state.num
    }
  },
  // mutations 更改Vuex的store中的状态的唯一方法；同步方法
  mutations: {
    increment(state,n){
      state.num++
      console.log(n);
    },
  },
  /* 
    Action 类似于 mutation，不同在于：
        Action 提交的是 mutation，而不是直接变更状态。
        Action 可以包含任意异步操作。
  */
  actions: {
    asyncinc(context,n){ //context 相当于 store
      setTimeout(() => {
        context.commit('increment',n);
      }, 2000);
    }
  },
  // modules中的小模块要写成对象形式
  modules: {

  }
})
