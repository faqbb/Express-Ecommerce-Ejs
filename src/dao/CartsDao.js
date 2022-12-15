import cartsModel from "./models/Carts.js"

export default class CartsDao {
    getById =  (id) => {
        return cartsModel.findOne({_id: id}).lean()
    }
    getByIdAndPopulate = async(id) => {
       const popuCart = await cartsModel.findOne({_id: id}).lean().populate('products.product')
       const cleanCart = JSON.stringify(popuCart.products, null, '\t')
       return JSON.parse(cleanCart)
    }
    save = () =>{
        return cartsModel.create({products:[]})
    }
    update = (id, cart) => {
        return cartsModel.findByIdAndUpdate(id, {$set: {products : cart.products}})
    }
    removeProduct = async() => {

    }

}