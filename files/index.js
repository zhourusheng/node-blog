const fs = require('fs')
const path = require('path')

// function getFileContent(filename, callback) {
//   const fullFileName = path.resolve(__dirname, 'json', filename)
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     callback(JSON.parse(data.toString()))
//   })
// }

// 通过 callback
// getFileContent('a.json', aData => {
//   console.log('aData', aData)
//   getFileContent(aData.next, bData => {
//     console.log('bData', bData)
//     getFileContent(bData.next, cData => {
//       console.log('cData', cData)
//     })
//   })
// })

function getFileContentByPromise(filename) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'json', filename)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}

// 通过 promise
// getFileContentByPromise('a.json').then(aData => {
//   console.log(aData)
//   return getFileContentByPromise(aData.next)
// }).then(bData => {
//   console.log(bData)
//   return getFileContentByPromise(bData.next)
// }).then(cData => {
//   console.log(cData)
// })

// 通过 async await 使用同步的写法来写异步的代码
const getRes = async () => {
  const aData = await getFileContentByPromise('a.json')
  console.log(aData)
  const bData = await getFileContentByPromise(aData.next)
  console.log(bData)
  const cData = await getFileContentByPromise(bData.next)
  console.log(cData)
}
getRes()