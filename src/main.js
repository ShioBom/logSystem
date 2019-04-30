import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import './assets/css/border.css'
import "./assets/css/reset.css"
import './assets/js/rem.js'
import './assets/css/fontstyles.css'
import  router from './router/index.js';
Vue.prototype.$axios = axios;
axios.defaults.baseURL="http://localhost:30001";
new Vue({
  el: '#app',
  axios,
  router,
  render: h => h(App)
})
