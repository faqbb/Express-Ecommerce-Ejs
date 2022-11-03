import mongoose, { mongo } from "mongoose";

const collection = 'Users'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user'},
    cart: Array
})

const userService = mongoose.model(collection,userSchema)

export default userService