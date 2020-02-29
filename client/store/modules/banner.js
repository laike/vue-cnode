import { get } from '../../untils/http'

const state = {
  banners: [],
  syncing: true
}

const getters = {}

const actions = {
  fetchBanner({ commit, state }) {
    commit('emptyBanner')
    //首先要获得头五个文章的相关信息
   }
}

const mutations = {
  emptyBanner(state) {
    state.banners = []
  },
  setLoading(state, isloading) {
    state.syncing = isloading
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
