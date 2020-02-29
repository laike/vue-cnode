<template>
  <el-row type="flex" class="replies">
    <el-col :span="4" class="flex vc tc">
      <el-row class="tc">
        <el-avatar
          v-bind:src="reply.author.avatar_url"
          class="avatar"
        ></el-avatar>
        <br />
        <el-link type="default">{{ reply.author.loginname }}</el-link>
      </el-row>
    </el-col>
    <el-col :span="16">
      <vue-markdown class="reply tl">{{
        rendermd(reply.content)
      }}</vue-markdown>
    </el-col>
  </el-row>
</template>
<script>
import dateFormat from 'dateformat'

import MarkdowIt from 'markdown-it'

import hljs from 'highlight.js'

import '../../css/github.css'

import VueMarkdown from 'vue-markdown'

export default {
  name: 'Reply',
  components: {
    'vue-markdown': VueMarkdown
  },
  props: ['reply'],
  methods: {
    dateFormat,
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
    linkto(id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.rel {
  position: relative;
}
.flex {
  display: flex;
}
.vc {
  align-items: center;
  justify-content: center;
}
.tc {
  text-align: center;
}
.tl {
  text-align: left;
}
.row {
  flex-direction: row;
}
.replies {
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
