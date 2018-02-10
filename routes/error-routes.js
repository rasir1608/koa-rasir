module.exports = function () {
  return function (ctx, next) {
    switch (ctx.status) {
      case 401:
        ctx.body = {
          ok: false,
          message: '没有权限'
        }
        break
      case 404:
        ctx.body = {
          ok: false,
          message: '没有找到内容 - 404'
        }
        break
    }
    return next()
  }
}
