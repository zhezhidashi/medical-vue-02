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
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router