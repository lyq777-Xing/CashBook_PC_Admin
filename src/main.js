import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.prototype.$message = Message

Vue.use(ElementUI);

Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://172.18.113.87:8888/'

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status == 400) {
            Message.error('用户名或密码错误')
        } else if (error.response.status == 403) {
            Message.error('您暂无该权限，请联系管理员授权')
        } else if (error.response.status == 401) {
            Message.error('后台出错了，请联系管理员')
        } else {
            Message.error("出错了");
            // return Promise.reject(error);
        }
    }
);


axios.interceptors.request.use(config => {
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')