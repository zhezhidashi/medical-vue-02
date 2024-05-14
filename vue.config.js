const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //关闭eslint
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:4523/m1/3980705-3616153-default',
                pathRewrite: {'^/api': ''},
                ws: true,
                changeOrigin: true
            },
        },
    },
})
