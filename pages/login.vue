<template>
  <div class="login">
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>

    <van-button type="primary" @click="login" class="login-btn">登录</van-button>
  </div>
</template>

<script>
const {config} = require('../config')
import CryptoJS from 'crypto-js'
import {Toast} from 'vant'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this._login()
    },
    
    async _login() {
      console.log(config[process.env.NODE_ENV].api)
      const {status, data} = await this.$axios.post(`${config[process.env.NODE_ENV].api}/users/login`, {
        username: encodeURIComponent(this.username),
        password: CryptoJS.MD5(this.password).toString(),
      })

      if (status === 200) {
        if (data && data.code === 0) {
          location.href = '/'
        } else {
          Toast.fail(data.msg)
        }
      } else {
        Toast.fail(`服务器出错，错误码：${status}`)
      }
    }
  }
}
</script>

<style>
.login {
  margin-top: 50px;
}
.login-btn {
  width: 90%;
  margin-left: 5%;
  margin-top: 30px;
}
  
</style>


