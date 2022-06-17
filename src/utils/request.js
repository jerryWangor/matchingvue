import axios from 'axios'

const token = localStorage.getItem('token')
console.log("token", token)
var service = axios
if (token) {
  // 如果token有值，在响应头里加上
  service = axios.create({ // 创建axios实例
    headers: {
      authorization: 'bearer ' + token
    },
  })
}

// post请求头
service.defaults.headers.post['Content-Type'] = 'multipart/form-data;charset=UTF-8'
service.defaults.baseURL = "http://10.0.17.46:20002/"

// 添加请求拦截器
service.interceptors.request.use(function (resp) {
  // 在发送请求之前做些什么
  return resp
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (resp) {
  // 对响应数据做点什么
  return resp
}, function (error) {
  // 如果响应状态码为403（token过期或无效），删除token
  if (error.response.status === 403) {
    localStorage.removeItem('token')
    // 跳转到登录页面
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
