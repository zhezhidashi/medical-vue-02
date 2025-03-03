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
                path: '/NetworkManage',
                name: 'NetworkManage',
                meta: {
                    title: '组网管理'
                },
                component: () => import('@/views/NetworkManage')
            },
            {
                path: '/ProjectsList',
                name: 'ProjectsList',
                meta: {
                    title: '项目管理'
                },
                component: () => import('@/views/ProjectsList')
            },
            {
                path: "/ProjectDetail",
                name: 'ProjectsDetail',
                meta: {
                    title: '项目详情'
                },
                component: () => import('@/views/ProjectDetail')
            },
            {
                path: "/ProjectsListNormalUser",
                name: 'ProjectsListNormalUser',
                meta: {
                    title: '参与项目列表'
                },
                component: () => import('@/views/ProjectsListNormalUser')
            },
            {
                path: '/AccountManage',
                name: 'AccountManage',
                meta: {
                    title: '账号管理'
                },
                component: () => import('@/views/AccountManage')
            },
            {
                path: '/DigitalObjectApproval',
                name: 'DigitalObjectApproval',
                meta: {
                    title: '追溯对象审批'
                },
                component: () => import('@/views/DigitalObjectApproval')
            },
            {
                path: '/DigitalObjectList',
                name: 'DigitalObjectList',
                meta: {
                    title: '追溯对象列表'
                },
                component: () => import('@/views/DigitalObjectList')
            },
            {
                path: '/DigitalObjectSearch',
                name: 'DigitalObjectSearch',
                meta: {
                    title: '追溯对象检索'
                },
                component: () => import('@/views/DigitalObjectSearch')
            },
            {
                path: '/DigitalObjectAllocate',
                name: 'DigitalObjectAllocate',
                meta: {
                    title: '追溯对象分配'
                },
                component: () => import('@/views/DigitalObjectAllocate')
            },
            {
                path: '/RetraceSystem',
                name: 'RetraceSystem',
                meta: {
                    title: '追溯系统'
                },
                component: () => import('@/views/RetraceSystem')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router