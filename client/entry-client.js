import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import api from 'vue-hot-reload-api' // eslint-disable-line
import store from './store'
import router from './config/router'

Vue.config.productionTip = false
Vue.use(ElementUI)
const render = Componet => {
  new Vue({
    store, //vuex
    router,// vue-router
    render: h => h(Componet)
  }).$mount('#app')
}
render(App)
// hot-reload
if (module.hot) {
  api.install(Vue)
  // compatibility can be checked via api.compatible after installation
  if (!api.compatible) {
    throw new Error(
      'vue-hot-reload-api is not compatible with the version of Vue you are using.'
    )
  }
  // indicate this module can be hot-reloaded
  module.hot.accept('./App', () => {
    let nextApp = require('./entry-client').default //eslint-disable-line
    render(nextApp)
  })
}
