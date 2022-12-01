import productModel from "./models/Products.js"

export default class ProductsDao {
    getById =  async(id) => {
        return await productModel.findOne({_id: id})
    }
    getAll = async() => {
        return await productModel.find()
    }
    save = async(product) =>{
        return await productModel.create(product)
    }

// If products had a 'stock' property, methods dedicated to updating it would be implemented here

}