import mongoose from "mongoose";

const collection = "Carts"

const schema = new mongoose.Schema({
    products: [
        {
            product: {
                type:mongoose.SchemaTypes.ObjectId,
                ref: 'Products'
            },
            quantity:{
                type: Number,
                default: 1
            }
        }
    ]
})

const cartsModel = mongoose.model(collection, schema)

export default cartsModel