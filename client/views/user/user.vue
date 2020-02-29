<template>
  <el-main v-loading="loading"> dd</el-main>
</template>
<script>
import PropTypes from 'prop-types'

import dateFormat from 'dateformat'

import queryString from 'query-string'

import { getLocalStorage } from '../../untils/untils'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: mapState({
    details: state => state.topic.details,
    replies: state => state.topic.details.replies,
    loading: state => state.topic.syncing
  }),
  methods: {
    ...mapActions('topics', ['getTopicDetail'])
  },
  components: {},
  beforeMount() {
    let { id } = this.$route.params
    // this.$store.dispatch('topic/getTopicDetail', id)
  }
}
</script>
<style scoped>
.tc {
  text-align: center;
}
</style>
