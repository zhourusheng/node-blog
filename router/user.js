const handleUserRouter = (req, res) => {
  const { method, path } = req
  const prefix = '/api/user'

  // 用户注册
  if (method === 'POST' && path === `${prefix}/signup`) {
    return {
      msg: '用户注册'
    }
  }

  // 用户登陆
  if (method === 'POST' && path === `${prefix}/login`) {
    return {
      msg: '用户登陆'
    }
  }

}
module.exports = handleUserRouter