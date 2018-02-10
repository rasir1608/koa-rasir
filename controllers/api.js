let Get = (ctx) => {
  ctx.body = {
    ok: true,
    message: JSON.stringify(ctx.method)
  }
}

let Post = async (ctx) => {
  ctx.body = {
    ok: true,
    message: JSON.stringify(ctx.method)
  }
}

let Put = (ctx) => {
  ctx.body = {
    ok: true,
    message: JSON.stringify(ctx.method)
  }
}

let Delete = (ctx) => {
  ctx.body = {
    ok: true,
    message: JSON.stringify(ctx.method)
  }
}
module.exports = {
  Get,
  Post,
  Put,
  Delete
}
