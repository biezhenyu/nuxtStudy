<template>
  <div>
    <nuxt />
    <van-tabbar v-model="active" v-show="tabBarShow">
      <van-tabbar-item @click="go(0)" url="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item @click="go(1)" url="/me" icon="friends-o" dot>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabBarShow: true
    }
  },
  methods: {
    go(url) {
      sessionStorage.setItem('active', JSON.stringify(url))
    },

    _handleTabbar() {
      const tabs = ['login', 'register', 'reset', 'addstudent']
      this.tabBarShow = !tabs.some(item => item === this.$route.name)
    }


  },
  created() {

    
  },

  mounted() {
    if (sessionStorage.getItem('active')) {
      let active = parseInt(sessionStorage.getItem('active'))
      this.active = active
    }

    // 处理导航显示
    this._handleTabbar()
   
  }

  
}
</script>


<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
