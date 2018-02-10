const sequelize = require('../lib/sequelize.js')
const User = sequelize.import('../models/re_users.js')
let Posts = async ctx => {
  let TYPE_CODE = ctx.request.body
  if (!TYPE_CODE) {
    ctx.body = {
      ok: false,
      message: '必须提供类型'
    }
  }
  let data = await User.findAll({
    where: {
      TYPE_CODE: {
        $like: `%${TYPE_CODE.TYPE_CODE}%`
      }
    }
  })
  ctx.body = {
    ok: true,
    data
  }
}
let GetAll = async ctx => {
  let users = await User.findAll()
  ctx.body = {
    ok: true,
    users
  }
}
let Get = async ctx => {
  let id = ctx.params.id
  let user = await User.findById(id)
  ctx.body = {
    ok: !!user,
    user
  }
}
let Post = async ctx => {
  let user = ctx.request.body
  let oldUser = await User.findOne({
    where: {
      USERNAME: user.USERNAME
    }
  })
  if (oldUser) {
    ctx.body = {
      ok: false,
      message: '用户已存在'
    }
    return
  }
  await User.create(user)
  ctx.body = {
    ok: true
  }
}
let Put = async ctx => {
  let id = ctx.params.id
  let user = await User.findById(id)
  let params = ctx.request.body
  if (!user) {
    ctx.body = {
      ok: false,
      message: '无数据'
    }
  } else {
    await user.update(params)
    ctx.body = {
      ok: true,
      user
    }
  }
}
let Delete = async ctx => {
  let id = ctx.params.id
  let user = await User.findById(id)
  if (!user) {
    ctx.body = {
      ok: false,
      message: '无数据'
    }
  } else {
    await user.destroy()
    ctx.body = {
      ok: true
    }
  }
}

module.exports = {
  Posts,
  GetAll,
  Get,
  Post,
  Put,
  Delete
}
