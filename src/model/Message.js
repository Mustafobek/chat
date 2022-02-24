import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sentTime: {
        type: Date,
        required: true
    }
})

const Message = mongoose.model('messages', messageSchema)

export default Message