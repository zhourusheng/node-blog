const querystring = require('querystring')
const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取 path
  const { url } = req
  req.path = url.split('?')[0]

  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 处理路由
  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return // 注意 return
  }

  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return // 注意 return
  }

  // 处理 404
  res.writeHead(404, { 'Content-type': 'text/plain' })
  res.write('404 Not Found\n')
  res.end()
}

module.exports = serverHandle
