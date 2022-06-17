const { defineConfig } = require('@vue/cli-service')
const { TrackOpTypes } = require('vue')

module.exports = defineConfig({
  lintOnSave: false, // 解决multi-word报错
  transpileDependencies: true,

  // module.exports = {
  devServer: {
    // open: true, // 自动打开浏览器
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    proxy: {
      '/http' : { // '/http'是代理标识，一般是每个接口前的相同部分
        target: "http://10.0.17.46:20002/", // 请求地址，一般是服务器地址
        changeOrigin: true, // 是否进行跨域
        pathRewrite: { // pathRewrite的作用是把请求接口中的 '/api'替换掉，一般是替换为空""
            '^/http':"/http"
        }
      }
      // '/ws': {
      //   target: 'ws://10.0.17.46:20002/',
      //   ws: true,
      //   changeOrigin: true, // 开启跨域
      // }
    }

  }
})
