<template>
  <div class="zyloading" v-if="loading">
    <van-loading class="cricle" color="white" />
  </div>
    
</template>

<script>
export default {
  props: {
    loading: {
      requird: true,
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="less">
.zyloading {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -23px;
  margin-top: -85px;
  background: rgba(0, 0, 0, .5);
  padding: 8px;
  border-radius: 4px;
  width: 46px;
  height: 46px;
  .cricle {
    margin: 8px 0 0 8px;
  }
}
</style>
