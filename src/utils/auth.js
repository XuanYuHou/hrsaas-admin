import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-hxy'
const TimeKey = 'hrsaas-timestamp-hxy'
// token相关
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 事件相关
export function getTimeStamp() {
  return Cookies.get(TimeKey)
}
export function setTimeStamp() {
  return Cookies.set(TimeKey, Date.now())
}
