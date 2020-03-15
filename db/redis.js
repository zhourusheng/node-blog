const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

const { host, port } = REDIS_CONF

const redisClient = redis.createClient(port, host)
redisClient.on('error', err => {
  console.log(err)
})

const setRedis = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

const getRedis = key => {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.stringify(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  setRedis,
  getRedis
}
