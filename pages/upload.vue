<template>
  <div class="photoUpdate">
    <h3 class="title">拍摄上传一张正面免冠头像照</h3>
    <p class="text">照片要保证光线充足，五官清晰无遮盖</p>
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
          点击拍照
        </van-uploader>
      </div>
    </div>
    <loading :loading="loading"></loading>
    <call :showDialog="show" @close="show=false" />
    <p class="promit" v-if="check">
      <van-icon :name="error ? 'info' : 'checked'" size="0.66666667rem" :color="error ? '#F76260' : '#43E0B1'"/>
      <span class="promit-text">{{error ? '照片检测不合格，请重新拍摄' : '照片检测成功，请进行提交更新'}}</span>
    </p>
    
    <button :disabled="isSubmit" @click="submit" class="photoUpdate-btn update-btn">提交</button>
    <button @click="show=true" class="photoUpdate-btn concat-btn">联系客服</button>
  </div>
  
</template>

<script>
import call from '../components/call'
import loading from '../components/loading'
import { Toast } from 'vant'
import util from '../util/index.js'
const {config} = require('../config')
export default {
  data() {
    return {
      defaultIcon: '',
      imageUrl: '',
      show: false,
      isSubmit: true,
      error: false,
      check: false,
      file: '',   // 储存file文件
      timer: null,
      loading: false,
      student: {}
    }
  },
  mounted() {
    this.defaultIcon = JSON.parse(sessionStorage.getItem('student')).photo
    this.student = JSON.parse(sessionStorage.getItem('student'))
  },
  methods: {
    onRead(file) {
      
      util.conversionImageToBase64(file.file, (url) => {
        this.imageUrl = url
        this.isSubmit = false
      })
    },


    // 照片编辑
    async _editMemberPhoto() {
      let {status, data} = await this.$axios.post(`${config[process.env.NODE_ENV].api}/student/updatePhoto`, {
        name: this.student.name,
        photo: this.imageUrl
      })
      util.handleRequest(status, () => {
        if (data.code === 0) {
          Toast.success('照片更新完成');
          location.href = '/'
          sessionStorage.removeItem('student')
        } else {
          Toast.fail(data.msg);
        }
      })
    },

    submit() {
      this._editMemberPhoto()
    },
    test() {

    }

  },
  components: {
    call,
    loading
  }
}
</script>

<style lang="less">
@import '../assets/less/bass.less';
.photoUpdate {
  .van-uploader__input {
    z-index: 30;
  }
  .title {
    .fs(36);
    .mt(112);
    color: #000;
    text-align: center;
  }
  .text {
    .fs(24);
    .mt(26);
    color: #888;
    text-align: center;
  }
  .iconWrapper {
    position: relative;
    left: 50%;
    .ml(-(456)/2);
    .w(456);
    .h(456);
    .mt(76);
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
  .update-btn {
    .mt(78);
    text-align: center;
    color: #fff;
    background:rgba(5,203,216,1);
  }
  .concat-btn {
    .mt(20);
    color: #888888;
    box-sizing: border-box;
    background: #ffffff;
    border:1px solid rgba(230,230,230,1);
  }
  .promit {
    display: flex;
    justify-content: center;
    .h(50);
    .lh(50);
    .mt(44);
    .fs(26);
    color: #333;
    &-text {
      display: inline-block;
      .ml(26);
    }
  }
}
</style>




