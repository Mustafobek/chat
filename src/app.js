import {Server as IoServer} from "socket.io";
import express from 'express'
import http from "http";
import path from 'path'
import {infoMessage} from "./utils/message.js";

const PORT = +process.env.PORT || 5050
const app = express()
const server = http.createServer(app)
const io = new IoServer(server)

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, './public')))

io.on('connection', socket => {
    console.log(`CID: ${socket.id}`)
    socket.emit('connection', `Connection id:${socket.id}`)

    // joining room
    socket.on('join-room', (data) => {

    })


    socket.on('chat-message', data => {
        // saving to db
        console.log(data)
    })


    socket.on('disconnect', () => {
        console.log('Disconnected from CID:', socket.id)
    })
})

server.listen(PORT, () => console.log(infoMessage(`Application serves on port: ${PORT}`)))