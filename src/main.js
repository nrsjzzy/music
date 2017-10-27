import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import "./calRem"
import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3000';
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
