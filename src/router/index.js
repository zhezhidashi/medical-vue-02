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
                path: '/NetworkingApply',
                name: 'NetworkingApply',
                meta: {
                    title: '组网申请'
                },
                component: () => import('@/views/NetworkingApply')
            },
            {
                path: '/NetworkingList',
                name: 'NetworkingList',
                meta: {
                    title: '组网列表'
                },
                component: () => import('@/views/NetworkingList')
            },
            {
                path: '/LeadingProjects',
                name: 'LeadingProjects',
                meta: {
                    title: '本机构主持项目'
                },
                component: () => import('@/views/LeadingProjects')
            },
            {
                path: '/ParticipatingProjects',
                name: 'ParticipatingProjects',
                meta: {
                    title: '本机构参与项目'
                },
                component: () => import('@/views/ParticipatingProjects')
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
                path: '/RelationshipSystem',
                name: 'RelationshipSystem',
                meta: {
                    title: '关系系统'
                },
                component: () => import('@/views/RelationshipSystem')
            },
            {
                path: '/DigitalObjectApply',
                name: 'DigitalObjectApply',
                meta: {
                    title: '数字对象申请'
                },
                component: () => import('@/views/DigitalObjectApply')
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
                path: '/DigitalObjectSearch',
                name: 'DigitalObjectSearch',
                meta: {
                    title: '数字对象检索'
                },
                component: () => import('@/views/DigitalObjectSearch')
            },
            {
                path: '/DigitalObjectImport',
                name: 'DigitalObjectImport',
                meta: {
                    title: '数字对象导入'
                },
                component: () => import('@/views/DigitalObjectImport')
            },
            {
                path: '/DigitalObjectExport',
                name: 'DigitalObjectExport',
                meta: {
                    title: '数字对象导出'
                },
                component: () => import('@/views/DigitalObjectExport')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router