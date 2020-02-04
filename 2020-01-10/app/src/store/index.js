import Vue from 'vue'
import Vuex from 'vuex'

import ind1 from './ind1';
import ind2 from './ind2';

Vue.use(Vuex)

export default new Vuex.Store({
    // modules中的小模块要写成对象形式
    modules: {
        a:ind1,
        b:ind2
    }
})
