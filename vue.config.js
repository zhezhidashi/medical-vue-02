const { defineConfig } = require('@vue/cli-service')

require('dotenv').config();
const express = require('express');
// 创建 Express 应用
const app = express();
app.use(express.json());

module.exports = defineConfig({
    transpileDependencies: true,
    //关闭eslint
    lintOnSave: false,
    devServer: {
        proxy: {
            '/backendOut': {
                target: process.env.BACKEND_OUT_URL,
                pathRewrite: {'^/backendOut': ''},
                ws: true,
                changeOrigin: true
            },
            '/public': {
                target: process.env.PUBLIC_URL,
                pathRewrite: {'^/public': ''},
                ws: true,
                changeOrigin: true
            },
        },
    },
})
