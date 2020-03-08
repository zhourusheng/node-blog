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

  // 处理 post data
  const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
      // 判断 method
      if (req.method !== 'POST') {
        resolve({})
        return
      }
      // 判断 content-type
      if (req.headers['content-type'] !== 'application/json') {
        resolve({})
        return
      }
      // 处理数据
      let postData = ''
      req.on('data', chunk => {
        postData += chunk
      })
      req.on('end', () => {
        if (!postData) {
          resolve({})
          return
        }
        return reject(JSON.parse(postData))
      })
    })
    return promise
  }

  getPostData(req).then(postData => {
    req.body = postData

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
  })

  // 处理 404
  res.writeHead(404, { 'Content-type': 'text/plain' })
  res.write('404 Not Found\n')
  res.end()
}

module.exports = serverHandle
