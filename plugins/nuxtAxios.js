import {Toast} from 'vant';
export default function ({ $axios, redirect, req, store, route, app }) {
  $axios.onRequest(config => {})
  $axios.onResponse((res) => {
    const {status, data} = res
    if (status === 200 && data.code === 407) {
      location.href = '/login'
    }
  })
  $axios.onError(err => {
    Toast.fail(`服务器出错，错误码404`)
    // if (err) {
    //   location.href = '/login'
    // }
    
  })

}