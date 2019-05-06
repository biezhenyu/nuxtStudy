export default function ({ $axios, redirect, req, store, route, app }) {
  $axios.onRequest(config => {})
  $axios.onResponse((res) => {
    const {status, data} = res
    if (status === 200 && data.code === 407) {
      location.href = '/login'
    }
  })
  $axios.onError(err => {
    if (err) {
      location.href = '/login'
    }
    
  })
}