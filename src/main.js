import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
// import router from './router'

Vue.use(Router)

Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
