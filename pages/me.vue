<template>
  <div class="me">
    <homeHeader @loginOut="loginOutShow = true"></homeHeader>

    <!-- 退出登录 -->
    <van-dialog
      class="loginOutDialog"
      v-model="loginOutShow"
      title="提示"
      @confirm="confirm"
      @cancel="cancel"
      show-cancel-button>
      <p>确定要退出当前登录状态吗？</p>
    </van-dialog>

  </div>
</template>

<script>
import homeHeader from '../components/Header'
const {config} = require('../config')
import {Toast} from 'vant'
export default {
  data() {
    return {
      loginOutShow: false
    }
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
    cancel() {}
  }
}
</script>

<style lang="less">
@import '../assets/less/bass.less';
.me {
  background: #fff;
  .pt(46);
  .pb(180);

  .loginOutDialog {
    p {
      color: #333333;
      .fs(30);
      .pt(48);
      .pb(48);
      text-align: center;
    }
  }
}
</style>
