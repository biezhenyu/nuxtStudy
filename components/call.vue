<template>
  <div class="calldialog">
    <van-dialog
      class="dialog"
      v-model="show"
      title="提示"
      @confirm="confirm"
      @cancel="cancel"
      show-cancel-button>
      <a ref="call" href="">客服联系电话：010-12345678 </a>
      <a>是否立即拨打客服电话</a>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show :false
    }
  },
  methods: {
    // 拨打电话
    confirm() {
      location.href = "tel:10086";
      this.$emit('close')
    },

    cancel() {
      this.$emit('close')
    }

  },
  watch: {
    showDialog(val) {
      this.show = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/bass.less';
.calldialog {
  .dialog {
    .fs(30);
    color: #333;
    a {
      text-align: center;
      display: block;
      &:nth-child(1) {
        .mt(13);
      }
      &:nth-child(2) {
        .mb(13);
      }
    }
  }
}

</style>


