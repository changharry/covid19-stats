import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import {store} from './store/store'
import {router} from './router/router'
import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
  id: 'UA-46778273-2',
  router,
  autoTracking: {
    pageviewOnLoad: false,
  },
});

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
