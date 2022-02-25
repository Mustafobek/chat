import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    }
})

const Room = mongoose.model('rooms', roomSchema)

export default Room