import mongoose, { mongo } from "mongoose";

const collection = 'Users'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    address: String,
    phone: String,
    profilePic: {type: String, default: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'},
    role: { type: String, default: 'user'},
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Carts
    }
})

const userService = mongoose.model(collection,userSchema)

export default userService