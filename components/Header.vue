<template>
  <div class="homeHeader">
    <img class="icon" :src="src" alt="">
    <span class="name">{{'张三'}}</span>
    <span @click="loginOut" class="loginOut"></span>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      src: require('../assets/images/head_portrait@2x.png')
    }
  },
    
  methods: {
    loginOut() {
      this.$emit('loginOut')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/bass.less';
.homeHeader {
  position: relative;
  left: (50%);
  .w(660);
  .h(148);
  .lh(148);
  .b_r(16);
  color: #FFFFFF;
  .fs(32);
  .ml(-(660)/2);
  .mt(40);
  background:linear-gradient(159deg,rgba(85,190,249,1) 0%,rgba(52,223,203,1) 82%,rgba(57,226,186,1) 100%);

  .icon {
    float: left;
    .w(98);
    .h(98);
    .mt(28);
    .ml(46);
    border-radius: 50%;
  }
  .name {
    float: left;
    .ml(48);
  }
  .loginOut {
    float: right;
    .w(39);
    .h(38);
    .mt(52);
    .mr(54);
    background-position: left center;
    .bgImg('ic_signout');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>

