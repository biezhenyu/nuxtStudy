<template>
  <div class="addStudent">
    <div class="iconWrapper">
      <div class="icon">
        <img class="image" :src="imageUrl || defaultIcon" alt="">
        <van-uploader 
          class="studentUploader"
          :after-read="onRead" 
          accept="image/*"
          capture="camera"
          @click="test"
          multiple>
          上传头像
        </van-uploader>
      </div>
    </div>
    <van-cell-group refs="groups">
      <van-field
        @blur="check('name')"
        v-model="user.name"
        label="学生姓名"
        :error-message="rules.name.err ? rules.name.errmessage : rules.name.message"
        placeholder="请输入学生姓名"
      />
     <van-field
        v-model="user.age"
        @blur="check('age')"
        label="年龄"
        type="number"
        :error-message="rules.age.err ? rules.age.errmessage : rules.age.message"
        placeholder="请输入年龄"
      />
      <van-field
        v-model="user.className"
        @blur="check('className')"
        label="班级"
        :error-message="rules.className.err ? rules.className.errmessage : rules.className.message"
        placeholder="请输入班级"
      />

      <van-field
        v-model="user.ino"
        @blur="check('ino')"
        label="学号"
        :error-message="rules.ino.err ? rules.ino.errmessage : rules.ino.message"
        placeholder="请输入学号"
      /> 
    </van-cell-group>
    <van-button :disabled="submit" @click="submitBtn" class="addStudent-btn" type="primary">添加</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import util from '../util/index.js'
const {config} = require('../config')
export default {
  data() {
    return {
      imageUrl: '',
      defaultIcon: '',
      submit: false,
      user: {
        name: '',
        photo: '',
        age: null,
        className: '',
        ino: '',
        
      },
      rules: {
        name: {errmessage: '请输入姓名', message: '', err: true},
        age: {errmessage: '请输入年龄', message: '', err: true},
        className: {errmessage: '请输入班级', message: '', err: true},
        ino: {errmessage: '请输入学号', message: '', err: true}   
      }
    }
  },
  mounted() {
    
  },
  methods: {
    onRead(file) {
      util.conversionImageToBase64(file.file, (url) => {
        this.imageUrl = url
        this.submit = false
        this.user.photo = url
      })
    },
    test() {
      
    },

    handleErr() {
      this.submit = Object.values(this.user).some(item => item == '' || item == null)
    },
    check(name) {
      this.user[name] ? this.rules[name].err = false : this.rules[name].err = true
      this.handleErr()

    },

    async submitBtn() {

     const {status, data} = await this.$axios.post(`${config[process.env.NODE_ENV].api}/student/addStudent`, this.user)
     util.handleRequest(status, () => {
        if (data.code === 0) {
          Toast.success('添加成功')
          location.href = '/'
        } else {
          Toast.fail(data.msg);
        }
      })
    }
    
  }
}
</script>

<style lang="less">
@import '../assets/less/bass.less';
.addStudent {
  text-align: center;
   .iconWrapper {
    position: relative;
    left: 50%;
    .ml(-(456)/2);
    .w(456);
    .h(456);
    .mt(76);
    .mb(40);
    border: 1px dashed #999;
    overflow: hidden;
  }
  .icon {
    position: relative;
    .w(456);
    .h(456);
    border-radius: 50%;
    overflow: hidden;
    .image {
      .w(456);
      .h(456);
      border-radius: 50%;
    }
    .studentUploader {
      position: absolute;
      left: 0;
      bottom: 0px;
      .w(456);
      .h(98);
      .lh(98);
      text-align: center;
      color: #ffffff;
      .fs(32);
      background:rgba(51,51,51,1);
      opacity:0.498;
      z-index: 20;
    }
  }
  .photoUpdate-btn {
    display: block;
    .w(540);
    .h(80);
    .lh(80);
    .fs(32);
    .ml(106);
    .b_r(46);
  }
  button {
    border: 0;
    padding: 0;
    outline: none;
  }
  &-btn {
    .w(690);
    .mt(20);
    padding: 0;
    box-sizing: border-box;
    &::before {
      .w(690);
    }
  }
}
</style>

