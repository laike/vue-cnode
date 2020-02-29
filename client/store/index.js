import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import topic from './modules/topic'
import banner from './modules/banner'
import { createLogger } from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app,
    topic,
    banner
  },
  strict: debug
})

export const strict = false
