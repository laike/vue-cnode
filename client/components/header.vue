<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        v-bind:index="index"
        v-for="(item, index) in this.tabs"
        v-bind:key="index"
        v-on:click="chageTab(index)"
        >{{ item }}</el-menu-item
      >
      <el-menu-item style="float:right;">
        注册
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { tabs } from '../untils/variable-define'
export default {
  mounted() {
    console.log(this.$router.params)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: 'fetchData'
  },
  data() {
    return {
      activeIndex: 'all',
      tabs: tabs
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
    chageTab(tab) {
      this.$router.push(`/list/${tab}`).catch(() => {})
    },
    fetchData() {
      let { tab } = this.$route.params
      this.$store.dispatch('topic/fetchTopics', tab)
    }
  }
}
</script>
<style>
.fr {
  float: right;
}
</style>
