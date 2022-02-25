import mongoose from 'mongoose'

const partSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    users: [{
        user: {
            type: String,
            required: true
        }
    }]
})

const Participants = mongoose.model('participants', partSchema)

export default Participants