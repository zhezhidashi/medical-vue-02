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
                path: '/ParticipatingProjects',
                name: 'ParticipatingProjects',
                meta: {
                    title: '项目管理'
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
                    title: '流转追溯系统'
                },
                component: () => import('@/views/RelationshipSystem')
            },
            {
                path: '/DigitalObjectApplyUser',
                name: 'DigitalObjectApplyUser',
                meta: {
                    title: '数字对象申请'
                },
                component: () => import('@/views/DigitalObjectApplyUser')
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
                path: '/DigitalObjectApplyInstitution',
                name: 'DigitalObjectApplyInstitution',
                meta: {
                    title: '机构申请列表'
                },
                component: () => import('@/views/DigitalObjectApplyInstitution')
            },
            {
                path: '/ApprovalExport',
                name: 'ApprovalExport',
                meta: {
                    title: '审批通过导出'
                },
                component: () => import('@/views/ApprovalExport')
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
                    title: '元数据导入'
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
            {
                path: '/DigitalObjectAllocate',
                name: 'DigitalObjectAllocate',
                meta: {
                    title: '数字对象分配'
                },
                component: () => import('@/views/DigitalObjectAllocate')
            },
            {
                path: '/PrivateKeyExport',
                name: 'PrivateKeyExport',
                meta: {
                    title: '导出动态私钥'
                },
                component: () => import('@/views/PrivateKeyExport')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router