<template>
  <section class="student">
    <homeHeader @loginOut="loginOutShow = true" :name="user.name"></homeHeader>
    <van-tabs 
      class="student-tabs"
      v-model="active" 
      :line-height="2"
      :line-width="60"
      color="#05CBD8"
      title-active-color="#05CBD8"
      :lazy-render="true"
      :swipeable="true"
      animated>
      <van-tab v-for="(item, index) in students" :key="index" :title="`学生${index + 1}`">
        <div class="student-icon">
          <img :src="item.photo || defaultIcon" alt="">
          <span 
            @click="update(item)" 
            class="update" 
            :style="{color: item.infoErr ? '#F76260' : '#ffffff'}">{{item.infoErr ? '信息有误' : '更新照片'}}</span>
        </div>
        <div class="student-name">{{item.name}}</div>
        <div class="student-class">
          <span class="classname">{{item.className}}</span>
          <span class="sno">{{item.ino}}</span>
        </div>
        <div class="student-upate" :class="[item.infoErr ? 'infoError' : 'infoNormal']">{{'照片最近更新：' + item.upDate + user.email}}</div>
        <div class="line"></div>

        <div class="student-common student-guide"></div>
        <div class="student-common student-tips"></div>
      </van-tab>
    </van-tabs>

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

  </section>
</template>

<script>
const {config} = require('../config')
import util from '../util/index.js'
import homeHeader from '../components/Header'
import moment from 'moment'


export default {
  data() {
    return {
      active: 0,
      students: [],
      defaultIcon: require('../assets/images/defaulthead.png'),
      loginOutShow: false,
      user: {}
    }
  },
  components: {
    homeHeader
  },
  created() {
    this._getStudents()
    this._getUSer()
  },
  mounted() {
  },
  methods: {

    async _getStudents() {
      let {status, data} = await this.$axios.get(`${config[process.env.NODE_ENV].api}/student/students`)
      util.handleRequest(status, () => {
        this.students = data.students
        this.students.map(item => {
          this.$set(item, 'infoErr', false)
          item.upDate = moment(item.upDate).format('YYYY-MM-DD')
          return item
        })
      })
    },

    async _getUSer() {
      let {status, data} = await this.$axios.get(`${config[process.env.NODE_ENV].api}/users/getUser`)
      util.handleRequest(status, () => {
        this.user.email = data.email
        this.user.name = data.username
      })
    },

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

    // 更新照片
    update(item) {
      if (!item.infoErr ) {
        location.href = '/upload'
        sessionStorage.setItem('student', JSON.stringify(item))
      } else {
        Dialog.alert({
          title: '提示',
          message: '无法进行照片更新。当前学生信息有误，请联系学校重新录入学生信息',
          confirmButtonText: '知道了'
        }).then(() => {
          console.log('知道了')
        });
      }
    },

  }
}
</script>

<style lang="less">
@import '../assets/less/bass.less';

.student {
  background: #fff;
  .pt(46);
  .pb(180);
  overflow: hidden;
  &-tabs {
    .van-hairline--top-bottom::after {
      border: 0!important;  
    }
  }
  &-icon {
    overflow: hidden;
    position: relative;
    .w(388);
    .h(388);
    .mt(38);
    .ml((388)/2);
   
    border-radius: 50%;
    img {
      .w(388);
      .h(388);
      border-radius: 50%;
    }
  }
  .update {
    position: absolute;
    left: 0;
    bottom: 0px;
    .w(388);
    .h(82);
    .lh(82);
    text-align: center;
    color: #ffffff;
    .fs(32);
    background:rgba(51,51,51,1);
    opacity:0.498;
  }
  &-name {
    color: #000;
    .fs(36);
    .mt(38);
    text-align: center;
  }
  &-class {
    display: flex;
    color: #000;
    .mt(20);
    span {
      flex: 1;
      .fs(28);
    }
    .classname {
      text-align: right;
      .pr(19);
    }
    .sno {
      text-align: left;
      .pl(19);
    }
  }
  &-upate {
    .fs(24);
    .mt(20);
    text-align: center;
  }
  .infoError {
    color: #F76260;
  }
  .infoNormal {
    color: #888888;
  }
  .line {
    width: 100%;
    height: 1px;
    background: #fff;
    .border1px(rgba(239,239,239,1));
    .mt(60);
  }
  &-common {
    .w(660);
    .h(160);
    .b_r(8);
    .ml(42);
  }
  &-guide {
    .mt(38);
    .bgImg('home_banner1');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  &-tips {
    .mt(20);
    .bgImg('home_banner2');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .loginOutDialog {
    p {
      color: #333333;
      .fs(30);
      .pt(48);
      .pb(48);
    }
  }
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
