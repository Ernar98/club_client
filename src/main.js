import Vue from 'vue'
import App from './App.vue'

import axios from 'axios';

window.axios = require('axios');

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = false
      

new Vue({
  render: h => h(App),
}).$mount('#app')
