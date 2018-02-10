const Sequelize = require('sequelize')
const path = require('path')
const config = require('config-lite')(path.join(__dirname, '../config'))
let Db = config.mysql
module.exports = new Sequelize(Db.database, Db.username, Db.password, {
  host: Db.host,
  port: Db.port,
  dialect: 'mysql',
  dialectOptions: { // MySQL > 5.5，其它数据库删除此项
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_520_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool: {
    max: 50,
    min: 0,
    idle: 10000
  }
})
