<template>
  <div class="me">
    
    <button @click="add">添加</button>

  </div>
</template>

<script>

const {config} = require('../config')
import {Toast} from 'vant'
export default {
  data() {
    return {
      
    }
  },
  components: {
    
  },
  methods: {
    

    async add() {
      const {status, data} = await this.$axios.post(`${config[process.env.NODE_ENV].api}/student/addStudent`, {
        name: "bzy",
        photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAq9JREFUWAnFmctqFEEUhm0xJgtJCKJGDSSCGzWikJ2ZCbNRdBkXeYc8SPa68C1UXOlSFBFRF1l4CYiXRRIhOzMLL8GZfKdJheqa6um6dFcO/HT16XP+83ed6pmemuzIvvX7/eMMr4Bx5avxuAPXxyzL/gVxIm4BbIImbQvytq/AjCSZue/gnG9yQPxPci4wk39dc48SOAdSiBNNZ8FVGbjaMQJta+4//h9AjqEm3LNAJkG3Cf2kaiwkpvVwtGjDG/OC7znLZ5GcF755erx5d3Jtow5xQgTPSw7bMg41m8CYttp0RPHZBNqKxPiekCyff4KvYA24G+ukA3T75p7dfGSKGYy6i0MRSLtWwTpoVaonKGmLqXcPKOsyGC6SgGQCqXVNKdOOQ0WmbvFnWvrOaOsJzp8huG3489OkAvnglo+am8Am8ikiB9uNM1mL1QxRcwK8BaYNtNv2Xax4Ko+wnyFIWhRiKyQ9BLNasmr3HWb7Ve6nSNAMkncX9EATdjCTMWtwjjvMtLuvc6hm8nSMwDoF2bj64owR+IH8nMTGHunrkn+bdbgd/JCQ/JjFNwWRtCPEJkl6BGaMZCXude6nSNBDYpB6nVJzErwHpu3guFEgw5FUIPXcxYnSlAKpNQrcZm5/GmMekkInHE8uETdvxBbXnHExqUAeLHndv69pGCouj0vZYiWMmvLC+gkUHwgVoB8PQ6Bev2qctMVVYmzXGxdIhx6A3+AP+AJO2oSU+RoXSOElMAZGwUVwHTibTWDw119J1Sg+m8Bp2tApKeblhucWCae8koxg293JO95zyGWzMWZfRbjlZSLKhORXCYNsNjZhZfWstdQWsOzHnLdG1Ov03wLm60d+Ci6DzXq1DLBtSR3qOe9PC8PBbwrW3Ajnl4HXFq2QOJj6G2LXIbYQsgdRVcAa3vFQ7wAAAABJRU5ErkJggg==",
        age: 19,
        className: "五年一班",
        ino: "12312312312313233"})
    }
  }
}
</script>

<style lang="less">
@import '../assets/less/bass.less';
.me {
  background: #fff;
  .pt(46);
  .pb(180);
}
</style>
