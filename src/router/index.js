import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let OriginPush = VueRouter.prototype.push;
let OriginReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        OriginPush.call(this, location, resolve, reject);
    }
    else {
        OriginPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        OriginReplace.call(this, location, resolve, reject);
    }
    else {
        OriginReplace.call(this, location, () => { }, () => { });
    }
}

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: () => import('@/views/Main.vue'),
        redirect: '/MainPage',
        children: [
            {
                path: '/MainPage',
                name: 'MainPage',
                meta: {
                    title: '主页'
                },
                component: () => import('@/views/MainPage')
            },
            {
                path: '/Login',
                name: 'Login',
                meta: {
                    title: '登录'
                },
                component: () => import('@/views/Login')
            },
            {
                path: '/DigitalObjectSearch',
                name: 'DigitalObjectSearch',
                meta: {
                    title: '数字对象申请'
                },
                component: () => import('@/views/DigitalObjectSearch')
            },
            {
                path: '/DigitalObjectApproval',
                name: 'DigitalObjectApproval',
                meta: {
                    title: '数字对象审批'
                },
                component: () => import('@/views/DigitalObjectApproval')
            },
            {
                path: '/DigitalObjectList',
                name: 'DigitalObjectList',
                meta: {
                    title: '数字对象列表'
                },
                component: () => import('@/views/DigitalObjectList')
            },
            {
                path: '/DigitalObjectOwn',
                name: 'DigitalObjectOwn',
                meta: {
                    title: '数字对象列表'
                },
                component: () => import('@/views/DigitalObjectOwn')
            },
            {
                path: '/RetraceSystem',
                name: 'RetraceSystem',
                meta: {
                    title: '流转追溯系统',
                },
                component: () => import('@/views/RetraceSystem')
            },
            {
                path: "/ProjectDetail",
                name: 'ProjectsDetail',
                meta: {
                    title: '项目详情'
                },
                component: () => import('@/views/ProjectDetail')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router