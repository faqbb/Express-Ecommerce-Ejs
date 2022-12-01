import cartsModel from "./models/Carts.js"

export default class CartsDao {
    getById =  (id) => {
        return cartsModel.findOne({_id: id}).lean()
    }
    getByIdAndPopulate = (id) => {
        return cartsModel.findOne({}).lean().populate('products.product')
    }
    save = () =>{
        return cartsModel.create({products:[]})
    }
    update = (id, cart) => {
        return cartsModel.findByIdAndUpdate(id, {$set: {products : cart.products}})
    }
    addProductToCart = async(cart, product) =>{
        cart.products.push(product)
        return cart
    }

}