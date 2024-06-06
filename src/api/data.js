import store from "@/store";
import axios from "axios";
import nprogress from 'nprogress';
import "nprogress/nprogress.css";

// 注：第一个页面里面两个上传文件的部分也有baseUrl，如果要改的话，一起改
// export const baseUrl = '/api'
export const baseUrl = 'http://47.93.215.112:8080'
export const mockUrl = "https://mock.apifox.com/m1/3980705-3616153-default"

// post请求
export const postForm = (requestUrl, params, This, callback) => {
    nprogress.start();
    console.log('postForm 的表单', requestUrl, params)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: baseUrl + requestUrl,
        method: 'post',
        data: params,
        headers: {
            Authorization: "Bearer " + TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postForm 的 response: ', requestUrl, res);
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
        console.log('postForm 的 error: ', baseUrl + requestUrl, err);
    })
}

// get请求
export const getForm = (requestUrl, This, callback) => {
    nprogress.start();
    console.log('getForm 的表单', requestUrl)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: baseUrl + requestUrl,
        method: 'get',
        headers: {
            Authorization: TokenValue
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
        url: baseUrl + requestUrl,
        method: 'post',
        data: params,
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postForm 的 response: ', requestUrl, res);
        if (res.code === 200) { 
            if(res.data.userType === 1) {
                // store.commit('setToken', res.data.accessToken)
                store.commit('setToken', res.data.refreshToken)
                store.commit('setUsername', params.username)
                store.commit('setUserType', 'user')
                callback({code: 200, msg: '登录成功'})
            }
            else {
                // store.commit('setToken', res.data.accessToken)
                store.commit('setToken', res.data.refreshToken)
                store.commit('setUsername', params.username)
                store.commit('setUserType', 'admin')
                callback({code: 200, msg: '登录成功'})
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

// post mock
export const postFormMock = (requestUrl, params, This, callback) => {
    nprogress.start();
    console.log('postForm 的表单', requestUrl, params)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: mockUrl + requestUrl + "?apifoxToken=FWfuxvo9z3Zb1yuOsKEfh",
        method: 'post',
        data: params,
        headers: {
            Authorization: "Bearer " + TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postForm 的 response: ', requestUrl, res);
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
        console.log('postFormMock 的 error: ', requestUrl, err);
    })
}

// get mock
export const getFormMock = (requestUrl, This, callback) => {
    nprogress.start();
    console.log('getForm 的表单', requestUrl)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: mockUrl + requestUrl + "?apifoxApiId=149513755&apifoxToken=FWfuxvo9z3Zb1yuOsKEfh",
        method: 'get',
        headers: {
            Authorization: TokenValue
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
        console.log('getFormMock 的 error: ', requestUrl, err);
    })
}