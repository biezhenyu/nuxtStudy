// 验证密码
// passport是Nodejs的一个中间键，用于用户名和密码的验证登陆。
const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../dbs/models/user')

// done 回调
passport.use(new LocalStrategy(async (username, password, done) => {
  let where = {
    username
  }
  let result = await UserModel.findOne(where) 
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

// 每次登录通过session去认证
// 序列化，存储session，用于自动登录
passport.serializeUser((user, done) => {
  done(null, user)
})

// 反序列化
passport.deserializeUser((user, done) => {
  return done(null, user)
})

module.exports = passport;

