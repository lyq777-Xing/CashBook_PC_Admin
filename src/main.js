import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.use(ElementUI);

Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://localhost:8888/'

/* axios.interceptors.request.use(config => {
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
}) */

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')