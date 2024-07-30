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
            '/api': {
                // target: 'http://47.93.215.112:8080',
                target: process.env.BACKEND_URL,
                pathRewrite: {'^/api': ''},
                ws: true,
                changeOrigin: true
            },
        },
    },
})
