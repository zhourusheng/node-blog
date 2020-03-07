const handleBlogRouter = (req, res) => {
  const { method, path } = req

  const prefix = '/api/blog'

  // 博客列表
  if (method === 'GET' && path === `${prefix}/list`) {
    return {
      msg: '博客列表'
    }
  }

  // 博客详情
  if (method === 'GET' && path === `${prefix}/detail`) {
    return {
      msg: '博客详情'
    }
  }

  // 新建博客
  if (method === 'POST' && path === `${prefix}/new`) {
    return {
      msg: '新建博客'
    }
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