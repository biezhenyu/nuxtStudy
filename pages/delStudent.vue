<template>
  <div class="delStudent">
    <van-swipe-cell 
      v-for="(item, index) in students"
      :key="index"
      :right-width="65" 
      :left-width="65">
      <van-cell-group>
        <van-cell :title="item.name" :value="item.className" />
      </van-cell-group>
      <span @click="onClose(item)" class="delBtn" slot="right">删除</span>
    </van-swipe-cell>
  </div>
</template>

<script>
const {config} = require('../config')
import {Toast, Dialog} from 'vant'
import util from '../util/index.js'
export default {
  data() {
    return {
      students: []
    }
  },
  created() {
    this._getStudents()
  },
  methods: {
    onClose(item) {
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(async () => {
        
        console.log('删除')

        // 删除学生
        const {status, data} = await this.$axios.post(`${config[process.env.NODE_ENV].api}/student/del`, {id: item._id})
        util.handleRequest(status, () => {
          if (data.code === 0) {
            Toast.success('删除成功')
            this._getStudents()
          } else {
            Toast.fail('删除失败')
          }
        })
      })
    },

     // 获取学生
     async _getStudents() {
      let {status, data} = await this.$axios.get(`${config[process.env.NODE_ENV].api}/student/students`)
      util.handleRequest(status, () => {
        this.students = data.students
        this.students.map(item => {
          this.$set(item, 'infoErr', false)
          return item
        })
      })
    },
  }
}
</script>


<style lang="less">
@import '../assets/less/bass.less';
.delStudent {
  .delBtn {
    .fs(28);
    width: 65px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #f44;
    color: #fff;
    display: block;
  }
}
</style>

