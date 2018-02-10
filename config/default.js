'use strict'

module.exports = {
  'system': {
    'server_type': 'http', // ', // API服务器协议类型,包含"http://"或"https://"
    'server_host': 'localhost', // API服务器暴露的域名地址,请勿添加"http://"
    'server_port': 3004, // API服务器监听的端口号
    'front_host': '*', // HTTP服务器地址,请勿添加"http://" （即前端调用使用的服务器地址，如果是APP请设置为 * ）
    'country': 'zh-cn', // 所在国家的国家代码
    // System_plugin_path: path.join(__dirname, "./plugins"), // 插件路径
    'Session_Key': 'RESTfulAPI', // 生产环境务必随机设置一个值
    'db_type': 'mysql' // 数据库类型
  },
  mysql: {
    host: 'localhost',
    port: 3306,
    username: 'devtest',
    password: 'devtest',
    database: 'report'
  },
  es: {
    hosts: [
      'http://localhost:1000'
    ]
  }
}
