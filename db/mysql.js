const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

const connection = mysql.createConnection(MYSQL_CONF)

connection.connect()

// 统一执行 sql 语句函数
const exec = sql => {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  exec
}