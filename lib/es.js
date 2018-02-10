const elasticsearch = require('elasticsearch')
const path = require('path')

const config = require('config-lite')(path.join(__dirname, '../config'))
let es = config.es
// let  str = "http://10.202.70.44"
// let str = "http://marvin-adas.sf-express.com"
let esClient = new elasticsearch.Client({
  hosts: es.hosts
  // sniff: true
  // host:"http://10.118.45.156:8093/es1"
  // host:"http://10.202.70.44/es"
})

module.exports = esClient
