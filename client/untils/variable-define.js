// this is schema from cnode api
export const topicSchema = {
  id: '',
  author_id: '',
  tab: '',
  content: '',
  title: '',
  last_reply_at: '',
  good: false,
  top: false,
  reply_count: 0,
  visit_count: 0,
  crate_at: '',
  author: {
    loginname: '',
    avatar_url: ''
  }
}

export const replySchema = {
  id: '',
  author: {
    loginname: '',
    avatar_url: ''
  },
  content: '',
  ups: [],
  create_at: '',
  reply_id: null,
  is_uped: false
}

export const userinfoSchema = {
  loginname: '',
  avatar_url: '',
  githubUsername: '',
  create_at: '',
  score: 0,
  recent_topics: [],
  recent_replies: []
}

export const messageSchema = {
  has_read_messages: [],
  hasnot_read_messages: []
}

export const tabs = {
  all: '全部',
  share: '分享',
  job: '工作',
  ask: '问答',
  good: '精品',
  dev: '测试'
}

export const footer = [
  {
    name: '服务器赞助商为',
    src: 'https://static.cnodejs.org/FuIpEaM9bvsZKnQ3QfPtBHWQmLM9'
  },
  {
    name: '存储赞助商为 ',
    src: 'https://static.cnodejs.org/Fg0jtDIcTqVC049oVu5-sn6Om4NX'
  },
  {
    name: '提供应用性能服务',
    src: 'https://static.cnodejs.org/FpMZk31PDyxkC8yStmMQL4XroaGD'
  }
]
