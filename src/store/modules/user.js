import { getToken, removeToken, setToken } from '@/utils/auth'
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
    setToken(data)
    commit('SETTOKEN', data)
    console.log(data)
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
