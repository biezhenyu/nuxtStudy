const Router =  require('koa-router')
const User = require('../dbs/models/user')
const axios = require('../util/axios')
const {config} = require('../../config');
const PassPort = require('../util/passport')

// 前缀
let router = new Router({
  prefix: '/users'
})

// 注册路由
router.post('/signUp', async (ctx) => {
  const {
    username,
    address,
    password
  } = ctx.request.body
  
  // 判断用户是否被注册
  let user = await User.find({username})
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户已被注册'
    }
    return;
  }

  // 创建新用户
  let newUser = await User.create({
    username,
    address,
    password
  })

  if (newUser) {
    ctx.body = {
      code: 0,
      msg: '注册成功'
    }
  }
})

// 登录
router.post('/login', async (ctx, next) => {
  
  // 调用local策略
  return PassPort.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)

})


// 获取用户信息
router.get('/getUser', async (ctx, next) => {

  // 获取session信息
  if (ctx.session.passport) {
    const {username, address} = ctx.session.passport.user
    ctx.body = {
      username,
      email: address
    } 
  } else {
    ctx.body = {
      code: 407,
      msg: '登录超时'
    }
  }
})

// 退出登录
router.post('/loginOut', async (ctx) => {
  await ctx.logout()

  if (!ctx.isAuthenticated) {

    ctx.body = {
      code: 0,
      msg: '退出登录成功'
    }
  } else {
    ctx.body = {
      code: 407,
      msg: '登录超时'
    }
  }
})

// 重置密码
router.post('/reset', async (ctx) => {
  const {password, username, lastpassword} = ctx.request.body
  const user = await User.findOne({username})
  if (lastpassword === user.password) {
    
    const info = await User.where({username})
              .update({password: password})

    if (info.ok === 1) {
      ctx.body = {
        code: 0,
        msg: '重置密码成功'
      } 
    } else {
      ctx.body = {
        code: -1,
        msg: '重置密码失败'
      } 
    }
    
  } else {
    ctx.body = {
      code: -1,
      msg: '输入上一次密码错误'
    } 
  }
})

module.exports = router