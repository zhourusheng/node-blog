const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog
} = require('../controller/blog')

const handleBlogRouter = (req, res) => {
  const { method, path } = req
  const { id } = req.query

  const prefix = '/api/blog'

  // 博客列表
  if (method === 'GET' && path === `${prefix}/list`) {
    const { author, keyword } = req.query
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  // 博客详情
  if (method === 'GET' && path === `${prefix}/detail`) {
    if (id) {
      const detailData = getDetail(id)
      return new SuccessModel(detailData)
    } else {
      return new ErrorModel('缺少id')
    }
  }

  // 新建博客
  if (method === 'POST' && path === `${prefix}/new`) {
    const data = newBlog(req.body)
    return new SuccessModel(data)
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
    return {
      msg: '删除博客'
    }
  }
}
module.exports = handleBlogRouter
