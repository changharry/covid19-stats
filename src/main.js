import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import {store} from './store/store'
import {router} from './router/router'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
