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
                path: '/MetadataList',
                name: 'MetadataList',
                meta: {
                    title: '项目元数据列表'
                },
                component: () => import('@/views/MetadataList')
            },
            {
                path: '/ApplyData',
                name: 'ApplyData',
                meta: {
                    title: '申请数据'
                },
                component: () => import('@/views/ApplyData')
            },
            {
                path: '/LocalStatisticalAnalysis',
                name: 'LocalStatisticalAnalysis',
                meta: {
                    title: '本地统计分析'
                },
                component: () => import('@/views/LocalStatisticalAnalysis')
            },
            {
                path: '/ApplyStatisticalData',
                name: 'ApplyStatisticalData',
                meta: {
                    title: '申请统计数据'
                },
                component: () => import('@/views/ApplyStatisticalData')
            },
            {
                path: '/ApprovalPage',
                name: 'ApprovalPage',
                meta: {
                    title: '审批页面'
                },
                component: () => import('@/views/ApprovalPage')
            },
            {
                path: '/ApprovalPageHasNetwork',
                name: 'ApprovalPageHasNetwork',
                meta: {
                    title: '审批单页面-有网'
                },
                component: () => import('@/views/ApprovalPageHasNetwork')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router