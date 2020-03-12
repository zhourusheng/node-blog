const querystring = require('querystring')
const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')

// 获取 session 过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

// session 数据
const SESSION_DATA = {}

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
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      return resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取 path
  const { url } = req
  req.path = url.split('?')[0]

  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 处理 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2;k3=v3;
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 解析 session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

  getPostData(req).then(postData => {
    req.body = postData
    // 处理路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      return blogResult
        .then(blogData => {
          // 设置cookie
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            )
          }
          res.end(JSON.stringify(blogData))
          return // 注意 return
        })
        .catch(err => {
          res.end(JSON.stringify(err))
          return
        })
    }

    const userResult = handleUserRouter(req, res)
    if (userResult) {
      return userResult
        .then(userData => {
          // 设置cookie
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            )
          }
          res.end(JSON.stringify(userData))
          return // 注意 return
        })
        .catch(err => {
          res.end(JSON.stringify(err))
          return
        })
    }

    // 处理 404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle
