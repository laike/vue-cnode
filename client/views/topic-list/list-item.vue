<template>
  <el-row type="flex" class="row">
    <el-col :xs="8" :sm="8" :md="10" :lg="12" :xl="8" class="tc vc rel">
      <span class="fit" v-bind:class="{ active: isActive }">
        {{ data.tab }}
      </span>
      <el-avatar v-bind:src="data.author.avatar_url" class="avatar"></el-avatar>
      <el-link type="default">{{ data.author.loginname }}</el-link>
    </el-col>
    <el-col :xs="16" :sm="8" :md="14" :lg="12" :xl="16" class="col tc">
      <el-link type="success" class="full block" v-on:click="linkto(data.id)">{{
        data.title
      }}</el-link>
      <el-link class="full block">
        创建时间：{{
          dateFormat(data.create_at, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
        }}
      </el-link>
    </el-col>
  </el-row>
</template>
<script>
import dateFormat from 'dateformat'
export default {
  name: 'ListItem',
  components: {},
  props: ['data'],
  methods: {
    dateFormat,
    linkto(id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  data() {
    return {
      isActive: this.data.top
    }
  }
}
</script>

<style scoped>
.rel {
  position: relative;
}
.fit {
  font-size: 12px;
  padding: 2px;
  border-radius: 5px;
  background-color: aliceblue;
  text-align: center;
  margin-right: 5px;
}
.active {
  background-color: aquamarine;
}
.full {
  display: -moz-box;
}
.col {
  flex-direction: column;
}
.tc {
  display: flex;
  align-items: center;
}
.avatar {
  margin-right: 10px;
}
.block {
  display: block;
}
.row {
  cursor: pointer;
  padding: 10px 0;
}
.row:hover,
.row:active {
  background-color: azure;
}
.title {
  text-align: left;
}
</style>
