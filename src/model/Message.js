import mongoose from 'mongoose'
import Room from "./Room.js";
import User from "./User.js";
import moment from "moment";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sentTime: {
        type: String,
        default: moment().format('DD-MM-YYYY HH:mm')
    },
    room: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

const Message = mongoose.model('messages', messageSchema)

export default Message