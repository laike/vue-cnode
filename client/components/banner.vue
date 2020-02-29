<template>
  <el-carousel class="rel" indicator-position="outside" v-loading="loading">
    <el-carousel-item v-for="(item,index) in this.banners" :key="item">
      <h3 class="title">{{ item }}</h3>
      <el-image :src="urls[index]" />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { mapState } from 'vuex'
import { tabs } from '../untils/variable-define'
import { get } from '../untils/http'
export default {
  created() {
    // get('/api/randomimg', {
    //   random: Math.random()
    // }).then(resp => {
    //   if (resp.data.success == true) {
    //     this.urls = resp.data
    //   }
    // })
  },
  mounted() {
    // this is banner
  },
  data() {
    return {
      urls: [
        'https://bing.ioliu.cn/v1/rand?w=800&h=600&r=' + Math.random(),
        'https://bing.ioliu.cn/v1/rand?w=800&h=600&r=' + Math.random(),
        'https://bing.ioliu.cn/v1/rand?w=800&h=600&r=' + Math.random(),
        'https://bing.ioliu.cn/v1/rand?w=800&h=600&r=' + Math.random(),
        'https://bing.ioliu.cn/v1/rand?w=800&h=600&r=' + Math.random()
      ]
    }
  },
  methods: {},
  computed: mapState({
    banners: state => state.topic.topics.slice(0, 5).map(item => item.title),
    loading: state => state.topic.syncing
  })
}
</script>

<style>
.rel {
  position: relative;
}
.title {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  z-index: 9;
  text-align: center;
  color: aliceblue;
}
</style>
