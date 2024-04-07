const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //关闭eslint
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://jsonplaceholder.typicode.com',
                pathRewrite: {'^/api': ''},
                ws: true,
                changeOrigin: true
            },
        },
    },
})
