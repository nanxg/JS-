const state = {
    val:'vue真的比较贴心'
}
const mutations = {
    // 失焦改值
    changeval(state,nV){
        state.val = nV;
    },
    aaa(){
        console.log('ind2的aaa')
    }
}
const getters = {
    // 数据二次处理
    revsers(){
        return state.val.split('').reverse().join('')
    }
}
export default {  // 使用modules要导出对象
    namespaced: true,
    state,
    mutations,
    getters
}