const Koa = require('koa')
const Router = require('koa-router')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')
const passport = require('./util/passport')
const store = require('./util/store')


// 处理post参数
const bodyParser = require('koa-bodyparser')

// 处理session
const session = require('koa-generic-session') 

// 处理json
const json = require('koa-json')

const app = new Koa()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

// 接口
const students = require('./interface/students')
const users = require('./interface/users')

// 中间键
const handleTimeOut = require('./middleware/handleTimeOut')

// 处理post请求
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))

// // 处理json
app.use(json())

// 和session有关的
app.keys = ['mt', 'keykeys']
app.proxy = true  //设置一些proxy header 参数会被加到信任列表中

// session 配置
app.use(session({
  key: 'mt',   // session前缀
  prefix: 'mt:uid',  // 前缀
  store: store
}))

// 链接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

// 初始化passport
app.use(passport.initialize())
app.use(passport.session())

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // 定义不需要验证的接口
  const check = {'/users/login': true, '/users/signUp': true, '/users/reset': true, '/users/getUser': false, '/users/loginOut': false,
                '/student/students': false, '/student/addStudent': false, '/student/updatePhoto': false, '/student/del': false,'/student/list': false}

  // 中间键
  app.use(handleTimeOut(check))

  // 使用路由
  app.use(students.routes()).use(students.allowedMethods())
  app.use(users.routes()).use(users.allowedMethods())




  app.use(ctx => {

    // 设置页面访问次数
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;

    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
