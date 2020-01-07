import Vue from 'vue'
import App from './App.vue'
import router from './router' // 导入rouder文件，默认查找里面的index.js

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
