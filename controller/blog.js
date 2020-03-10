const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = 'select * from blogs where 1=1 '
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return exec(sql)
}

const getDetail = id => {
  const sql = `select * from blogs where id=${id}`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData
  const createtime = Date.now()
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createtime}, '${author}');
  `
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `update blogs set title='${title}', content='${content}' where id=${id};`
  return exec(sql).then(updateData => {
    return updateData.affectedRows > 0
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  return exec(sql).then(deleteData => {
    return deleteData.affectedRows > 0
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
