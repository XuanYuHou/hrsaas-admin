import { getToken, removeToken, setToken, setTimeStamp } from '@/utils/auth'
import { getUserInfo, geuUserDetailById, login } from '@/api/user'
const state = {
  token: getToken() || null,
  userInfo: {}
}
const mutations = {
  SETTOKEN(state, token) {
    state.token = token
    setToken(token)
  },
  REMOVETOKEN(state) {
    state.token = null
    removeToken()
  },
  SETUSERINFO(state, payload) {
    state.userInfo = payload
  },
  REMOVEUSERINFO(state) {
    state.userInfo = {}
  }
}
const actions = {
  async GetToken({ commit }, result) {
    const data = await login(result)
    commit('SETTOKEN', data)
    setTimeStamp()
  },
  async getUserInfo({ commit }) {
    const result = await getUserInfo()
    const detail = await geuUserDetailById(result.userId)
    commit('SETUSERINFO', { ...result, ...detail })
    return result
  },
  logOut({ commit }) {
    commit('REMOVETOKEN')
    commit('REMOVEUSERINFO')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
