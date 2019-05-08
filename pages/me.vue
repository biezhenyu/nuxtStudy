<template>
  <div class="me">
    <homeHeader @loginOut="loginOutShow = true"></homeHeader>

    <van-cell-group class="cellGroup">
      <van-cell @click="go" title="添加学生" icon="add-o" is-link />
    </van-cell-group>

  </div>
</template>

<script>
import homeHeader from '../components/Header'
const {config} = require('../config')
import {Toast} from 'vant'
import util from '../util/index.js'
export default {
  data() {
    return {
      loginOutShow: false
    }
  },
  created() {
    
  },
  components: {
    homeHeader
  },
  methods: {
    
    async confirm() {
      
      const {status, data} = await this.$axios.post(`${config[process.env.NODE_ENV].api}/users/loginOut`)
      if (status === 200) {
        if (data && data.code === 0) {
          this.loginOutShow = false
          sessionStorage.clear('active')
        }
      } else {
        Toast.fail(`服务器出错，错误码：${status}`)
      }
    },
    cancel() {},
    go() {
      location.href= '/addstudent'
    }
  }
}
</script>

<style lang="less">
@import '../assets/less/bass.less';
.me {
  background: #fff;
  .pt(46);
  .pb(180);
  .cellGroup {
    .mt(50);
  }
}
</style>
