import store from "@/store";
import axios from "axios";
import nprogress from 'nprogress';
import "nprogress/nprogress.css";

// 注：第一个页面里面两个上传文件的部分也有baseUrl，如果要改的话，一起改
export const backendUrl = '/backendOut'
export const publicUrl = '/public'
export const backendIn = '/backendIn'


// 外网的 IP 和 PORT
// export const backend_out_ip = "8.130.160.66"
// export const backend_out_port = 8080

import { backendOutIp, backendOutPort } from '@/../public/backend-out-env.js'

export const backend_out_ip = backendOutIp
export const backend_out_port = backendOutPort


// post请求
export const postForm = (requestUrl, params, This, callback) => {
    nprogress.start();
    console.log('postForm 的表单', requestUrl, params)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: backendUrl + requestUrl,
        method: 'post',
        data: params,
        headers: {
            Authorization: "Bearer " + TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postForm 的 response: ', requestUrl, res);
        if (res.code === 200 || requestUrl === "/networkGroups/getInstitutionsByGid") { 
            callback(res) 
        }
        else {
            This.$message({
                message: res.message,
                type: 'error'
            });
            callback(res)
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('postForm 的 error: ', backendUrl + requestUrl, err);
    })
}

// get请求
export const getForm = (requestUrl, This, callback) => {
    nprogress.start();
    console.log('getForm 的表单', requestUrl)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: backendUrl + requestUrl,
        method: 'get',
        headers: {
            Authorization: "Bearer " + TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('getForm 的 response: ', requestUrl, res);
        if (res.code === 200) { 
            callback(res) 
        }
        else {
            This.$message({
                message: res.message,
                type: 'error'
            });
            callback(res)
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('getForm 的 error: ', requestUrl, err);
    })
}

// 登录
export const loginRequest = (requestUrl, params, This, callback) => {
    nprogress.start();
    console.log('postForm 的表单', requestUrl, params)
    axios.request({
        url: backendUrl + requestUrl,
        method: 'post',
        data: params,
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postForm 的 response: ', requestUrl, res);
        if (res.code === 200) { 
            if(res.data.userType === 1) {
                // store.commit('setToken', res.data.accessToken)
                store.commit('setToken', res.data.accessToken)
                store.commit('setUsername', params.username)
                store.commit('setUserType', 'user')
                callback({code: 200, message: '登录成功'})
            }
            else {
                // store.commit('setToken', res.data.accessToken)
                store.commit('setToken', res.data.accessToken)
                store.commit('setUsername', params.username)
                store.commit('setUserType', 'admin')
                callback({code: 200, message: '登录成功'})
            }
            callback(res) 
        }
        else {
            This.$message({
                message: res.message,
                type: 'error'
            });
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('loginRequest 的 error: ', requestUrl, err);
    })
}


// 第三方平台post请求
export const postFormPublic = (requestUrl, params, This, callback) => {
    nprogress.start();
    console.log('postFormPublic 的表单', requestUrl, params)
    axios.request({
        url: publicUrl + requestUrl,
        method: 'post',
        data: params,
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postFormPublic 的 response: ', publicUrl + requestUrl, res);
        if (res.code === 200) { 
            callback(res) 
        }
        else {
            This.$message({
                message: res.message,
                type: 'error'
            });
            callback(res)
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('postFormPublic 的 error: ', publicUrl + requestUrl, err);
    })
}

// 第三方平台的get请求
export const getFormPublic = (requestUrl, This, callback) => {
    nprogress.start();
    axios.request({
        url: publicUrl + requestUrl,
        method: 'get',
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('getFormPublic 的 response: ', publicUrl + requestUrl, res);
        if (res.code === 200) { 
            callback(res) 
        }
        else {
            This.$message({
                message: res.message,
                type: 'error'
            });
            callback(res)
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('getFormPublic 的 error: ', publicUrl + requestUrl, err);
    })
}


// 内网平台post请求
export const postFormIn = (requestUrl, params, This, callback) => {
    nprogress.start();
    console.log('postFormIn 的表单', requestUrl, params)
    axios.request({
        url: backendIn + requestUrl,
        method: 'post',
        data: params,
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postFormIn 的 response: ', backendIn + requestUrl, res);
        if (res.code === 200) { 
            callback(res) 
        }
        else {
            This.$message({
                message: res.message,
                type: 'error'
            });
            callback(res)
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('postFormIn 的 error: ', backendIn + requestUrl, err);
    })
}

// 内网平台的get请求
export const getFormIn = (requestUrl, This, callback) => {
    nprogress.start();
    axios.request({
        url: backendIn + requestUrl,
        method: 'get',
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('getFormIn 的 response: ', backendIn + requestUrl, res);
        if (res.code === 200) { 
            callback(res) 
        }
        else {
            This.$message({
                message: res.message,
                type: 'error'
            });
            callback(res)
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('getFormIn 的 error: ', backendIn + requestUrl, err);
    })
}

// 导出数据
export const exportDataIn = (requestUrl, params, This, callback) => {
    nprogress.start();
    console.log('内网 exportData 的表单', requestUrl, params)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: backendIn + requestUrl,
        method: 'post',
        data: params,
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('内网 exportData 的 response: ', backendIn, res);
        callback(res)
    })
    .catch((err) => {
        nprogress.done()
        console.log('内网 exportData 的 error: ', backendIn + requestUrl, err);
    })
}