const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, newBlog } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
  const { method, path } = req
  const prefix = '/api/blog'

  // 博客列表
  if (method === 'GET' && path === `${prefix}/list`) {
    const { author, keyword } = req.query
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  // 博客详情
  if (method === 'GET' && path === `${prefix}/detail`) {
    const { id } = req.query
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

  // 删除博客
  if (method === 'POST' && path === `${prefix}/delete`) {
    return {
      msg: '删除博客'
    }
  }

  // 更新博客
  if (method === 'POST' && path === `${prefix}/update`) {
    return {
      msg: '更新博客'
    }
  }
}
module.exports = handleBlogRouter
