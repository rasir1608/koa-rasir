const esClient = require('../lib/es')
const moment = require('moment')
const log4js = require('koa-log4')
const path = require('path')
const XLSX = require('xlsx')
const axios = require('axios')
const qs = require('qs')
const logger = log4js.getLogger('es')
let Post = async (ctx) => {
  // let id = ctx.params.id
  let req = ctx.request.body
  let startDate = moment(req.date).valueOf() / 1000
  let endDate = moment(req.date).valueOf() / 1000
  logger.info(startDate)
  let data = await esClient.search({
    index: 'adas_dxpfullprotodata*',
    type: 'record',
    size: 99999,
    body: {
      query: {
        bool: {
          must: [
            {
              match: {
                imei: '865473038209774F'
              }
            },
            {
              range: {
                receiveTime: {
                  'gt': startDate,
                  'lt': endDate
                }
              }
            }]
        }
      },
      sort: [{
        receiveTime: {
          order: 'asc'
        }
      }]
    }
  })
  ctx.body = {
    ok: true,
    // message: JSON.stringify(ctx.method),
    data
  }
}

let Download = async (ctx) => {
  let req = ctx.request.body
  let uploadfolderpath = path.join(__dirname, '../../assets/uploads')

  let startDate = req.startDate
  let endDate = req.endDate
  let imei = req.imei
  let filename = moment(startDate * 1000).format('YYYY-MM-DD-hh-mm-ss') + 'ie-' + imei + '.xlsx'
  let keys = await esClient.search({
    index: 'adas_dxpfullprotodata*',
    type: 'record',
    size: 1,
    body: {
      query: {
        bool: {
          must: [
            {
              match: { imei: imei }
            },
            {
              range: {
                receiveTime: {
                  gt: startDate,
                  lt: endDate
                }
              }
            }]
        }
      }
    }
  })
  function intToChar (value, index) {
    let a = parseInt(value / 26)
    let b = value % 26
    let str1 = String.fromCharCode(64 + a)
    let str2 = String.fromCharCode(64 + b)
    if (a === 0) {
      return str2 + index
    } else if (a === parseInt(value / 26) && b === 0) {
      str2 = 'Z'
      str1 = ''
      if (a !== 1) {
        str1 = String.fromCharCode(64 + a - 1)
      }
      return str1 + str2 + index
    } else {
      return str1 + str2 + index
    }
  }
  let _headers = keys.hits.hits.map((v, i) => {
    let obj = {}
    obj['A1'] = {
      v: 'receiveTime'
    }
    obj['B1'] = {
      v: 'imei'
    }
    Object.keys(v._source.dxpGpsData).forEach((dgd, dgi) => {
      let str = intToChar(dgi + 3, 1)
      obj[str] = {
        v: dgd
      }
    })
    Object.keys(v._source.dxpFullProtoData).forEach((dfp, dfi) => {
      let str = intToChar(dfi + Object.keys(v._source.dxpGpsData).length + 3, 1)
      obj[str] = {
        v: dfp
      }
    })
    return obj
  }).reduce((prev, next) => Object.assign({}, prev, next))
  let res = await esClient.search({
    index: 'adas_dxpfullprotodata*',
    type: 'record',
    size: 99999,
    body: {
      query: {
        bool: {
          must: [
            {
              match: { imei: imei }
            },
            {
              range: {
                receiveTime: {
                  gt: startDate,
                  lt: endDate
                }
              }
            }]
        }
      }
    }
  })
  if (res.hits.hits.length === 0) {
    ctx.body = {
      ok: false,
      message: '暂无数据'
    }
    return
  }
  let _data = {}
  res.hits.hits.forEach((v, i) => {
    _data['A' + (i + 2)] = {
      v: moment(v._source.receiveTime * 1000).format('YYYY-MM-DD hh:mm:ss')
    }
    _data['B' + (i + 2)] = {
      v: v._source.imei
    }
    Object.keys(v._source.dxpGpsData).forEach((dgd, dgi) => {
      let str = intToChar(dgi + 3, i + 2)
      _data[str] = {
        v: v._source.dxpGpsData[dgd]
      }
    })
    Object.keys(v._source.dxpFullProtoData).forEach((dfp, dfi) => {
      let str = intToChar(dfi + Object.keys(v._source.dxpGpsData).length + 3, i + 2)
      _data[str] = {
        v: v._source.dxpFullProtoData[dfp]
      }
    })
  })
  var output = Object.assign({}, _headers, _data)
  // 获取所有单元格的位置
  var outputPos = Object.keys(output)
  // 计算出范围
  var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1]
  // 构建 workbook 对象
  var wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      'mySheet': Object.assign({}, output, { '!ref': ref })
    }
  }
  XLSX.writeFile(wb, path.join(uploadfolderpath, filename))
  ctx.body = {
    ok: true,
    message: 'assets/uploads/' + filename
  }
}

let excel = async (ctx) => {
  // let req = ctx.request.body
  let paths = path.join(__dirname, '../../assets/1208.xlsx')
  const workbook = XLSX.readFile(paths, {})
  const sheetNames = workbook.SheetNames
  const worksheet = workbook.Sheets[sheetNames[0]]
  let result = XLSX.utils.sheet_to_json(worksheet).map(v => {
    return v.empCode
  })
  for (var i = 0; i < result.length; i++) {
    const url = 'http://host:port/server/app/token'
    let obj = {
      appsecret: '',
      appkey: '',
      serviceName: '',
      rid: '',
      userName: '',
      isban: 'no',
      accounts: result[i]
    }
    await axios.post(url, qs.stringify(obj))
    logger.info(result[i])
    // console.log(qs.toString(obj))
  }
  ctx.body = {
    ok: true
  }
}

module.exports = {
  Post,
  Download,
  excel
}
