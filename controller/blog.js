const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'hahaha'
    },
    {
      id: 2,
      title: '黑黑嘿嘿嘿'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 2,
      title: '黑黑嘿嘿嘿',
      author: 'heihei',
      createTime: 1583583036098
  }
}

const newBlog = (data = {}) => {
  console.log(data)
  return {
    id: 3
  }
}

module.exports = {
  getList,
  getDetail,
  newBlog
}