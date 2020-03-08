const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login, signup } = require('../controller/user')

const handleUserRouter = (req, res) => {
  const { method, path } = req
  const prefix = '/api/user'
  const { username, password } = req.body

  // 用户注册
  if (method === 'POST' && path === `${prefix}/signup`) {
    if (username && password) {
      try {
        const res = signup(username, password)
        if (res) {
          return new SuccessModel('注册成功')
        } else {
          return new ErrorModel('注册失败')
        }
      } catch (error) {
        return new ErrorModel(error)
      }
    } else {
      return new ErrorModel('缺少参数')
    }
  }

  // 用户登录
  if (method === 'POST' && path === `${prefix}/login`) {
    if (username && password) {
      try {
        const res = login(username, password)
        if (res) {
          return new SuccessModel('登录成功')
        } else {
          return new ErrorModel('登录失败')
        }
      } catch (error) {
        return new ErrorModel(error)
      }
    } else {
      return new ErrorModel('缺少参数')
    }
  }
}
module.exports = handleUserRouter
