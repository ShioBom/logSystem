import Vue from 'vue'
import App from './App.vue'
import './assets/css/border.css'
import "./assets/css/reset.css"
import './assets/js/rem.js'
import './assets/css/fontstyles.css'
import  router from './router/index.js';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
