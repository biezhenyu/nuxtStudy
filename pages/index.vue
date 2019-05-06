<template>
  <section class="container">
    <van-nav-bar
      class="navBar"
      title="学生信息"/>
    <div class="hold"></div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      
      <van-card
        v-for="(item, index) in students"
        :key="index"
        :num="item.class"
        :price="item.sno"
        :desc="item.update"  
        :title="item.name"
        currency=""
        :lazy-load="true"
        :thumb="item.image" />
    
      

    </van-list>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
const {config} = require('../config')

export default {
  data() {
    return {
      active: 0,
      students: [],
      loading: false,
      finished: false
    }
  },
  components: {
    Logo
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onLoad() {
      this.getStudents()
      this._getUSer()
     
    },

    async _getUSer() {
      let {status, data} = await this.$axios.get(`${config[process.env.NODE_ENV].api}/users/getUser`)
      console.log(data)
    },
    async getStudents() {
      let { status, data: {list} } = await this.$axios.get(`${config[process.env.NODE_ENV].api}/student/list`, {})

      this.loading = false;

      if (list.length === 0) {
        this.finished = true;
      } else {
        this.students = this.students.concat(list)
      }
    },
  }
}
</script>

<style>
.navBar {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
.hold {
  height: 46px;
}
</style>
