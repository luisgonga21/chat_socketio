const koa = require("koa")
const http = require("http")
const socket = require("socket.io")


const app = new koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost';
const SERVER_PORT = 8080;

io.on('connection', socket => {
    console.log('[IO] Connection => server has a new connection')
    socket.on('disconnect', () => {
        console.log('[SOCKET] disconnect => A connection was disco')
    })
    socket.on('chat.message', data => {
        console.log('[SOCKET] chat.message => ', data)
        io.emit('chat.message', data)
    })
})


server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[http] Listen => Server is runnig at http://${SERVER_HOST}:${SERVER_PORT}`)
})

