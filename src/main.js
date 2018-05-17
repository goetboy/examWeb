// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' 
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// import 'element-ui/lib/theme-chalk/index.css';
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$ajax = axios

/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})