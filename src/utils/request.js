import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
import router from '@/router'
const TimeOut = 3600
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logOut')
      router.push('/login')
      return Promise.reject(new Error('登录超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use((response) => {
  const { data, success, message } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当响应返回状态码为10002时，表示token失效，需要重新登录
    store.dispatch('user/logOut')
    router.push('/login')
  }
  Message.error(error.message)
  return Promise.reject(error)
})
function IsCheckTimeOut() {
  return Date.now() - getTimeStamp() > (TimeOut * 1000)
}
export default service
