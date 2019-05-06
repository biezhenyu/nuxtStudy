<template>
  <div class="register">
    <van-cell-group>
      <van-field
        v-model="user.address"
        required
        clearable
        label="邮箱"
        :error-message="rules.address"
        @blur="verification('address')"
        placeholder="请输入邮箱"
      />

      <van-field
        v-model="user.username"
        required
        clearable
        label="用户名"
        :error-message="rules.username"
        @blur="verification('username')"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        :error-message="rules.password"
        @blur="verification('password')"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>

    <van-button type="primary" @click="register" class="register-btn">注册</van-button>
  </div>
</template>

<script>
const {config} = require('../config')
import CryptoJS from 'crypto-js'
import {Toast} from 'vant'
export default {
  data() {
    return {
      user: {
        address: '',
        username: '',
        password: ''
      },
      rules: {
        address: '',
        username: '',
        password: ''
      }
      
    }
  },

  methods: {
    register() {
     
      const result = Object.values(this.user).some(item => item === '')
      if (!result) {
        this._register()
      } else {
        this.verification()
      }

    },

    async _register() {
      const {status, data} = await this.$axios.post(`${config[process.env.NODE_ENV].api}/users/signUp`, {
        username: encodeURIComponent(this.user.username),

        // MD5加密，由于MD5方法返回的是一堆数组，需要通过toString转为字符串
        password: CryptoJS.MD5(this.user.password).toString(),
        address: this.user.address
      })
      if (status === 200) {
        if (data && data.code === 0) {
          Toast.success('注册成功');
          location.href = '/login'
        } else {
          Toast.fail(data.msg)
        }
      } else {
        Toast.fail(`服务器出错，错误码：${status}`)
      }
      

    },  
    verification(key) {
      if (!key) {
        for (let k in this.rules) {
          this.rules[k] = '请填写信息'
        }
        return;
      }
      this.user[key] ? this.rules[key] = '' : this.rules[key] = '请填写信息'
      
    },


  }
}
</script>

<style>
.register {
  margin-top: 50px;
}
.register-btn {
  width: 90%;
  margin-left: 5%;
  margin-top: 30px;
}
</style>

