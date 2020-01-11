import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:0
  },
  mutations: {
    increment(state,n){
      state.num++
      console.log(n);
    }
  },
  actions: {
    asyncinc(context,n){
      setTimeout(() => {
        context.commit('increment',n);
      }, 2000);
    }
  },
  modules: {

  }
})
