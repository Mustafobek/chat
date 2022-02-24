import mongoose from 'mongoose'

const partSchema = new mongoose.Schema({
    room: {
        type: Room,
        required: true
    },
    user: {
        type: User,
        required: true
    }
})

const Participants = mongoose.model('participants', partSchema)

export default Participants