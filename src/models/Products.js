import mongoose, { mongo } from "mongoose";

const collection = 'Products'

const productSchema = new mongoose.Schema({
        name: String,
        price: Number,
        description: String,
        category: String,
        imageUrl: String
})

const productService = mongoose.model(collection, productSchema)

export default productService