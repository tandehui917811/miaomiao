import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.axios = axios

Vue.filter("setWH",(res,q) => {
  return res.replace(/w\.h/,q)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
