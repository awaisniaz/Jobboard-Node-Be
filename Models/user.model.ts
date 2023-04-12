import mongoose from "mongoose";

const User_schema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        immutable: true

    },
    password: {
        type: String
    },
    profilePhoto: {
        type: String
    }
}, {
    timestamps: true
})


const User = mongoose.model('User', User_schema)
export default User