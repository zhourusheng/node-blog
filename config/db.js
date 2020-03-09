const env = process.env.NODE_ENV // 环境参数

let MYSQL_CONF

// 开发环境 数据库配置
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'my_blog'
  }
}

// 生产环境 数据库配置
if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'my_blog'
  }
}

module.exports = {
  MYSQL_CONF
}
