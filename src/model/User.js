import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firebaseRegId: {
        type: String
    }
})

const User = mongoose.model('users', userSchema)

export default User