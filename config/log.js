const log4js = require('koa-log4')
const path = require('path')
const logDir = path.join(__dirname, '../logs') // 配置目标路径 logs
/* 生成logs目录 */
try {
  require('fs').mkdirSync(logDir) // 新建目录， ./logs
} catch (err) {
  if (err.code !== 'EEXIST') {
    console.error('Could not set up log directory, error was: ', err)
    process.exit(1)
  }
}
log4js.configure({
  appenders: {
    out: { type: 'console' },
    default: {
      type: 'dateFile',
      filename: 'logs/default/default',
      pattern: '-dd.log',
      alwaysIncludePattern: true,
      maxLogSize: 10485760
    },
    http: {
      type: 'dateFile',
      filename: 'logs/http/http',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLogSize: 10485760
    },
    error: {
      type: 'dateFile',
      filename: 'logs/error/error',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLogSize: 10485760
    }
  },
  categories: {
    default: { appenders: ['out', 'default'], level: 'info' },
    http: { appenders: ['http'], level: 'info' },
    error: { appenders: ['out', 'error'], level: 'error' }
  }
})
