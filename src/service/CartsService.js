export default class CartsService {
    constructor(dao){
        this.dao = dao
    }
    createCart = () => {
        return this.dao.save()
    }
    getCartById = (cartId) => {
        return this.dao.getCartById(cartId)
    }
    getPopulatedCart = (cartId) => {
        return this.dao.getByIdAndPopulate(cartId)
    }
    UpdateCart = (id, cart) => {
        return this.dao.update(id,cart)
    }
    addProductToCart = (cart, product) => {
        return this.dao.addProductToCart(cart, product)
    }
}