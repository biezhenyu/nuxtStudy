const Router = require('koa-router');
const axios = require('../util/axios');
const {config} = require('../../config');
const Student = require('../dbs/models/student');

const router = new Router({
  prefix: '/student'
})

router.get('/students', async (ctx) => {
  const { _id } = ctx.session.passport.user
  let students = await Student.find({parentId: _id})
  ctx.body = {
    code: 0,
    msg: '查找成功',
    students
  }

})

router.post('/addStudent', async (ctx) => {
  const {
    name,
    photo,
    age,
    className,
    ino
  } = ctx.request.body
 
  const { _id } = ctx.session.passport.user

  // 判断学生是否存在
  let student = await Student.find({name})
  if (student.length) {
    ctx.body = {
      code: -1,
      msg: '学生已存在'
    }
    return
  }

  // 添加学生
  let newStudent = await Student.create({
    parentId: _id,
    name,
    photo,
    age,
    className,
    ino,
    upDate: Date.now()
  })
  if (newStudent) {
    ctx.body = {
      code: 0,
      msg: '添加学生成功'
    }
  }
})

// 更新学生照片
router.post('/updatePhoto', async (ctx) => {
  const {photo, name} = ctx.request.body
  const user = await Student.find({name})
  const info = await Student.where({name})
            .update({photo})

  if (info.ok === 1) {
    ctx.body = {
      code: 0,
      msg: '修改头像成功'
    } 
  } else {
    ctx.body = {
      code: -1,
      msg: '修改头像失败'
    } 
  }

})

// 删除学生
router.post('/del', async (ctx) => {
  const {id} = ctx.request.body  
  await Student.where({_id: id})
        .remove()
  const student = await Student.findOne({_id: id})
  if (!student) {
    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '删除失败'
    }
  }
 
})


router.get('/list', async (ctx) => {
  
  let {status, data: {result}} = await axios.post(`${config[process.env.NODE_ENV].apiPath}/getChildInfo`, {})
  status == 200
  ? ctx.body = {list: result.list}
  : ctx.body = {list: []}
  
  
})
module.exports = router;