<template>
  <el-main v-loading="loading">
    <Banner />
    <ListItem v-for="(item, index) in this.topics" v-bind:data="item" v-bind:key="index"></ListItem>
  </el-main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ListItem from './list-item'
import Banner from '../../components/banner'
export default {
  name: 'TopicList',
  data() {
    return {}
  },
  computed: mapState({
    topics: state => state.topic.topics,
    loading: state => state.topic.syncing
  }),
  methods: mapActions('topics', ['fetchTopics']),
  components: {
    ListItem,
    Banner
  },
  beforeMount() {
    this.$store.dispatch('topic/fetchTopics', 'all')
  }
}
</script>

<style></style>
