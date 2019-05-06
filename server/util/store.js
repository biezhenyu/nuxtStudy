// 初始化session的store

let store = {
  storage: {},
  get (key, maxAge) {
    return this.storage[key]
  },
  set (key, sess, maxAge) {
    this.storage[key] = sess
  },
  destroy (key) {
    delete this.storage[key]
  }
}

module.exports = store