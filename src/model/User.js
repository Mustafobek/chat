import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
})

const User = mongoose.model('users', userSchema)

export default User