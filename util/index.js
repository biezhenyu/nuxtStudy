import {Toast} from 'vant'
export default  {
  handleRequest (status, successCb = () => {}, errCb = () => {}) {
    if (status !== 200) {
      Toast.fail(`服务器出错，错误码：${status}`)
      errCb && errCb()
    } else {
      successCb()
    }
  },

    // 转换图片为base64
    conversionImageToBase64(file, cb) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        cb(this.result)
      }
    },
}