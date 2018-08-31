const elasticsearch = require('elasticsearch')
const path = require('path')

const config = require('config-lite')(path.join(__dirname, '../config'))
let es = config.es
let esClient = new elasticsearch.Client({
  hosts: es.hosts
  // sniff: true
  // host:"http://host/es"
})

module.exports = esClient
