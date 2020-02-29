import { get } from '../../untils/http'

import { topicSchema } from '../../untils/variable-define'

import { toJS, extendObservable } from 'mobx'

function createTopic(topic) {
  return { ...topicSchema, ...topic }
}

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
}
const state = {
  topics: [],
  syncing: true,
  details: [],
  tab: 'all'
}

const getters = {
  cnodeTopics: state => {
    return state.topics.map(topic => new Topic(createTopic(topic)))
  },
  cnodeDetails: state => {
    return state.details.map(detail => new Topic(createTopic(detail)))
  },
  detailMap: state => {
    return state.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
  }
}

const actions = {
  fetchTopics({ state, commit }, tab) {
    return new Promise((resolve, reject) => {
      // 这里需要判断是否需要获取新的数据
      if (state.tab === tab) {
        resolve()
      } else {
        commit('setTab', tab)
      }

      commit('setLoading', true)
      commit('emptyTopics')
      get('/topics', { mdrender: false, tab })
        .then(resp => {
          if (resp.success) {
            resp.data.forEach(topic => {
              commit('addTopic', topic)
            })
            commit('setLoading', false)
            resolve()
          } else {
            reject()
            commit('setLoading', false)
          }
        })
        .catch(err => {
          reject(err)
          commit('setLoading', false)
        })
    })
  },
  getTopicDetail({ commit, getters }, id) {
    return new Promise((resolve, reject) => {
      if (getters.detailMap[id]) {
        console.log('this data in detailMap')
        resolve(getters.detailMap[id])
      } else {
        commit('setLoading', true)
        commit('emptyDetails')
        get(`/topic/${id}`, {
          mdrender: false
        })
          .then(resp => {
            if (resp.success) {
              commit('addDetail', resp.data)
              commit('setLoading', false)
              resolve()
            } else {
              reject()
              commit('setLoading', false)
            }
          })
          .catch(err => {
            console.log(err)
            reject(err)
            commit('setLoading', false)
          })
      }
    })
  },
  toJson({ state }) {
    return {
      topics: toJS(state.topics),
      syncing: state.syncing,
      details: toJS(state.details)
    }
  }
}

const mutations = {
  setTab(state, tab) {
    state.tab = tab
  },
  emptyTopics(state) {
    state.topics = []
  },
  emptyDetails(state) {
    state.details = []
  },
  addTopic(state, topic) {
    state.topics.push(new Topic(createTopic(topic)))
  },
  addDetail(state, detail) {
    state.details.push(new Topic(createTopic(detail)))
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
