<template>
  <el-main v-loading="loading">
    <h3 v-if="details.length" class="tc">{{ details[0].title }}</h3>
    <vue-markdown v-if="details.length" class="aticle">{{
      rendermd(details[0].content)
    }}</vue-markdown>
    <h2 v-if="details.length" class="rtitle">最新评论：</h2>
    <!-- replies -->
    <div v-if="details.length" class="rcontent">
      <div v-if="details[0].replies.length">
        <reply
          class="replies"
          v-bind:reply="reply"
          v-bind:key="index"
          v-for="(reply, index) in details[0].replies"
        />
      </div>
      <div v-else style="text-align:center;padding:15px;">
        暂时还没有评论！
      </div>
    </div>
  </el-main>
</template>
<script>
import PropTypes from 'prop-types'

import dateFormat from 'dateformat'

import MarkdowIt from 'markdown-it'

import VueMarkdown from 'vue-markdown'

import hljs from 'highlight.js'

import '../../css/github.css'

import queryString from 'query-string'

import Reply from './reply'

import { tabs } from '../../untils/variable-define'

import { getLocalStorage } from '../../untils/untils'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      mdeValue: ''
    }
  },
  computed: mapState({
    details: state => state.topic.details,
    replies: state => state.topic.details.replies,
    loading: state => state.topic.syncing
  }),
  methods: {
    rendermd(c) {
      let md = MarkdowIt({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
        highlight(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return `<pre class="hljs"><code>${
                hljs.highlight(lang, str, true).value
              }</code></pre>`
            } catch (__) {
              console.log(__)
            }
          }
          return `<pre class="hljs"><code>${md.utils.escapeHtml(
            str
          )}</code></pre>`
        }
      })
      return md.render(c)
    },
    ...mapActions('topics', ['getTopicDetail'])
  },
  components: {
    'vue-markdown': VueMarkdown,
    reply: Reply
  },
  beforeMount() {
    let { id } = this.$route.params
    this.$store.dispatch('topic/getTopicDetail', id)
  }
}
</script>
<style scoped>
.tc {
  text-align: center;
}
.rtitle {
  padding: 10px 0 10px 10px;
  background-color: aquamarine;
  text-align: left;
}
.rcontent {
  overflow: hidden;
  background-color: azure;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.aticle {
  text-align: left;
}
</style>
