const http = require('http')

const PORT = 8080
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT)
console.log('listen at 8080...')