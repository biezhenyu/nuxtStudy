const Router = require('koa-router');
const axios = require('../util/axios');
const {config} = require('../../config');

const router = new Router({
  prefix: '/student'
})

router.get('/list', async (ctx) => {
  if (ctx.isAuthenticated()) {
    let {status, data: {result}} = await axios.post(`${config[process.env.NODE_ENV].apiPath}/getChildInfo`, {})
    status == 200
    ? ctx.body = {list: result.list}
    : ctx.body = {list: []}
  } else {
    ctx.body = {
      code: 407,
      msg: '登录超时'
    }
  }
  
})


router.get('/record', async (ctx) => {
  let {status, data: {result}} = await axios.post(`${config[process.env.NODE_ENV].apiPath}/getRecord`, {})
  status === 200
  ? ctx.body = {list: result.item_list}
  : ctx.body = {list: []}
})

module.exports = router;