import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome.vue'
import Admin from '../components/Admin.vue'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import User from '../components/User.vue'
import Permission from '../components/Permission.vue'
import Role from '../components/Role.vue'
import Own from '../components/own.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome, meta: { keepAlive: true, comp: Welcome, name: 'welcome' } },
            { path: '/admin', component: Admin, meta: { keepAlive: true, comp: Admin, name: 'admin' } },
            { path: '/user', component: User, meta: { keepAlive: true, comp: User, name: 'user' } },
            { path: '/permission', component: Permission, meta: { keepAlive: true, comp: Permission, name: 'permission' } },
            { path: '/role', component: Role, meta: { keepAlive: true, comp: Role, name: 'role' } },
            { path: '/own', component: Own, meta: { keepAlive: true, comp: Own, name: 'own' } },
        ]
    },
    {
        path: '/login',
        component: Login
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to要访问的路径

    //from代表从哪个路径来

    //next是函数 放行

    if (to.path === '/login') return next();
    //token
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr) return next('/login')
    next()
})


router.beforeEach((to, from, next) => {
    // 每次切换页面时，调用进度条
    NProgress.start()
    if (to.meta.menuKey != undefined) {
        store.commit('addRoute', to)
        store.commit('setRouterTagActive', to)
    }

    next()
})


NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载icon
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
})

//当路由进入后：关闭进度条
router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})


export default router