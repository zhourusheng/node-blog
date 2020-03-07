const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  const data = {
    name: 'zhourusheng'
  }
  res.end(
    JSON.stringify(data)
  )
}

module.exports = serverHandle
