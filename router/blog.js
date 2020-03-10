const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')

const handleBlogRouter = (req, res) => {
  const { method, path } = req
  const { id } = req.query

  const prefix = '/api/blog'

  // 博客列表
  if (method === 'GET' && path === `${prefix}/list`) {
    const { author, keyword } = req.query
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 博客详情
  if (method === 'GET' && path === `${prefix}/detail`) {
    return new Promise((resolve, reject) => {
      if (id) {
        const result = getDetail(id)
        return result.then(detailData => {
          resolve(new SuccessModel(detailData))
        })
      } else {
        reject(new ErrorModel('缺少id'))
      }
    })
  }

  // 新建博客
  if (method === 'POST' && path === `${prefix}/new`) {
    req.body.author = 'zhourusheng' // 假数据
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新博客
  if (method === 'POST' && path === `${prefix}/update`) {
    if (id) {
      const result = updateBlog(id, req.body)
      if (result) {
        return new SuccessModel('更新博客成功')
      } else {
        return new ErrorModel('更新博客失败')
      }
    } else {
      return new ErrorModel('缺少id')
    }
  }

  // 删除博客
  if (method === 'POST' && path === `${prefix}/delete`) {
    if (id) {
      const result = delBlog(id)
      if (result) {
        return new SuccessModel('删除博客成功')
      } else {
        return new ErrorModel('删除博客失败')
      }
    } else {
      return new ErrorModel('缺少id')
    }
  }
}
module.exports = handleBlogRouter
