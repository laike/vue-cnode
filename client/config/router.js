import Vue from 'vue'
import VueRouter from 'vue-router'
// import components
import TopicList from '../views/topic-list/index'

import TopicDetail from '../views/topic-detail/index'

import CreateTopic from '../views/create/index'

import Login from '../views/user/login'

import NotFound from '../views/notfound'

import UserInfo from '../views/user/user'
Vue.use(VueRouter) // gloabal introducing

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: TopicList
  },
  {
    path: '/list/:tab',
    component: TopicList,
    key: 'list',
    loadData: TopicList.loadData
  },
  {
    path: '/detail/:id',
    component: TopicDetail,
    key: 'detail',
    loadData: TopicDetail.loadData
  },
  {
    path: '/user/login',
    component: Login,
    key: 'login'
  },
  {
    path: '/user:id',
    component: UserInfo,
    key: 'userinfo'
  },
  {
    path: '/create/topic',
    component: CreateTopic,
    key: 'createtopic'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
