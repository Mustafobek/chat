import {Server as IoServer} from "socket.io";
import express from 'express'
import http from "http";
import path from 'path'
import './database/mongoose.js'

import {infoMessage} from "./utils/log-message.js";
import User from "./model/User.js";
import Participants from "./model/Participants.js";
import Room from "./model/Room.js";
import Message from "./model/Message.js";
import {format} from "./utils/chat-message.js";

const PORT = +process.env.PORT || 5050
const app = express()
const server = http.createServer(app)
const io = new IoServer(server)

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, './public')))

const ADMIN_BOT = 'ADMIN'

io.on('connection', socket => {
    console.log(`CID: ${socket.id}`)
    socket.emit('connection', `Connection id:${socket.id}`)

    // joining room
    socket.on('join-room', async (data) => {
        // ROOM EXISTS
        let room = await Room.findOne({room: data.room})

        if(!room) {
            room = new Room({room: data.room})
            await room.save()
        }

        let user = await User.findOne({username: data.username})

        if(!user) {
            user = new User({username: data.username})
            await user.save()
        }

        const participants = await Participants.findOne({room: data.room})

        if(!participants) {
            const parts = new Participants({
                room: room._id,
                users: [{user: user._id}]
            })
            await parts.save()
        } else {
            participants.users.push(user)
            await participants.save()
        }

        // joining to the room
        socket.join(data.room)


        // WELCOME messaging by bot
        socket.emit('message', format(ADMIN_BOT, 'Welcome to the chat'))


        // USER JOIN BROADCASTING
        socket.broadcast.to(data.room).emit('message', `${user.username} joined to the chat`)

        // ROOM AND ROOM-USERS INFO
        io.to(data.room).emit('room-users', {
            room: data.room,
            users: await Participants.find({room: data.room})
        })
    })


    // TODO: USER LOGIC
    socket.on('chat-message', async data => {
        // saving to db

        // const user = await User.findOne({})

        const message = new Message({
            user: 'user._id',
            text: data.message
        })

        await message.save()

        // const participant = await Participants.findOne({$where: {users: {$inc: user._id}}})

        io.to(participant.room).emit('message', message)
        console.log(data)
    })


    socket.on('disconnect', () => {
        console.log('Disconnected from CID:', socket.id)
    })
})

server.listen(PORT, () => console.log(infoMessage(`Application serves on port: ${PORT}`)))