// import Vue from 'vue'
// import router from '@/router'
// import Vuex from 'vuex'
// Vue.use(Vuex)

// export default new Vuex.Store({
//     state: {
//         tagsRouter: [],
//     },
//     getters: {
//         getTagsRouter(state) {
//             //获取标签路由信息
//             return state.tagsRouter
//         },
//     },
//     mutations: {

//         setRouterTagActive(state, routeItem) {
//             //设置当前的tag页为活动页
//             for (let i = 0; i < state.tagsRouter.length; i++) {
//                 let item = state.tagsRouter[i]
//                 state.tagsRouter[i].isActive = false
//                 if (state.tagsRouter[i].name === routeItem.name) {
//                     state.tagsRouter[i].isActive = true
//                 }
//             }

//             console.log(state.tagsRouter)
//         },
//         addRoute(state, routeItem) {
//             //选择菜单后，添加至本地路由信息中
//             let flog = false
//             for (let i = 0; i < state.tagsRouter.length; i++) {
//                 let item = state.tagsRouter[i]
//                 if (state.tagsRouter[i].name === routeItem.name) {
//                     flog = true
//                     break
//                 }
//             }
//             if (!flog) {
//                 state.tagsRouter.push({
//                     path: routeItem.path,
//                     name: routeItem.name,
//                     meta: routeItem.meta,
//                 })
//             }
//         },
//         delRoute(state, params) {
//             //删除tags路由项
//             if (state.tagsRouter.length != 0) {
//                 let itemIndex = 0
//                 for (let i = 0; i < state.tagsRouter.length; i++) {
//                     let item = state.tagsRouter[i]
//                     if (state.tagsRouter[i].meta.menuKey === params.item.meta.menuKey) {
//                         //
//                         itemIndex = i
//                         state.tagsRouter.splice(i, 1)
//                         break
//                     }
//                 }

//                 //跳除后的跳转
//             }
//         },
//     },
//     actions: {
//         doSomething(context, val) {
//             //应用：this.$store.dispatch("doSomething",{})
//             //提交mutations内的方法：context.commit("setUser",val)
//         },
//     },
//     modules: {},
// })