const { exec } = require('../db/mysql')

const login = (username, password) => {
  const sql = `
    select username, realname from users where username='${username}' and password='${password}'
  `
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

const signup = (username, password) => {
  return true
}

module.exports = {
  login,
  signup
}
