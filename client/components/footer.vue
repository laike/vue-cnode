<template>
  <el-row :gutter="20">
    <el-col :span="24">
      CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js
      的技术研究。</el-col
    >
    <el-col :span="8" v-bind:key="index" v-for="(item, index) in this.footer">
      {{ item.name }}<el-image :src="item.src"></el-image>
    </el-col>
    <el-col :span="24">
      新手搭建 Node.js 服务器，推荐使用无需备案的 DigitalOcean(
      <el-link type="primary">https://www.digitalocean.com/</el-link>
      )
    </el-col>
  </el-row>
</template>
<script>
import { footer } from '../untils/variable-define'
export default {
  data() {
    return {
      footer
    }
  }
}
</script>
