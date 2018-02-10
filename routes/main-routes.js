const KoaRouter = require('koa-router')
const controllers = require('../controllers/index')
// const axios = require('axios')
// const fse = require('fs-extra')
// const path = require('path')
const router = new KoaRouter()
router
  .get('/public/hello', async ctx => {
    // let req = ctx.query
    ctx.body = {
      ok: true,
      message: 'hello world'
    }
  })
  .get('/public/api', controllers.api.Get)
  .post('/public/api', controllers.api.Post)
  .put('/public/api', controllers.api.Put)
  .delete('/public/api', controllers.api.Delete)
  .post('/public/es', controllers.es.Post)
  .post('/public/es/down', controllers.es.Download)
  .get('/public/excel', controllers.es.excel)
module.exports = router
