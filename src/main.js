import Vue from 'vue'
Vue.config.productionTip = false


// 引入 element ui
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

// 引入router
import router from './router'
// page title修改 以及 登录保护
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0
    // 兼容firefox
    document.documentElement.scrollTop = 0
    // 兼容safari
    window.pageYOffset = 0
    // 鼠标点击
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    // 没登录的话强制跳到登录页面
    store.commit('getToken')
    const token = store.state.user.token
    const username = store.state.user.username
    const userType = store.state.user.userType
    if ((!token || !username || !userType) && to.name !== 'Login') {
        next({
            name: 'Login'
        })
    }
    else if (token && username && userType && to.name === 'Login') {
        next({ name: 'RetraceSystem' })
    }
    else {
        next()
    }
})

// 引入Swiper样式
import "swiper/dist/css/swiper.css";

// 引入仓库
import store from './store'




new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

