const mysql = require('mysql')

// 创建连接对象
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'my_blog'
})

// 开始连接
connect.connect()

// 执行 sql 语句
const sql = `select * from users;`
connect.query(sql, (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(result)
})

// 关闭连接
connect.end()