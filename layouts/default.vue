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
      localStorage.setItem('active', JSON.stringify(url))
    },

    _handleTabbar() {
      const tabs = ['login', 'register']
      this.tabBarShow = !tabs.some(item => item === this.$route.name)
    }


  },
  created() {

    
  },

  mounted() {

    // 重置字体
    (function(doc, win) {
      var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (docEl.clientWidth > docEl.clientHeight) {
          docEl.style.fontSize = docEl.clientHeight / 10 + 'px';
        } else {
          docEl.style.fontSize = docEl.clientWidth / 10 + 'px';
        }
      }
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);

    if (localStorage.getItem('active')) {
      let active = parseInt(localStorage.getItem('active'))
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
