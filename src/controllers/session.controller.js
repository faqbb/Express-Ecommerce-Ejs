import { cartsService, usersService, productsService } from "../service/indexService.js";

const addProduct = async(req,res) => {
    try {
        if (req.session.user) {
            const {id} = req.session.user
            const targetUser = await usersService.getUserByID(id) 
            const targetCart = await cartsService.getCartById(targetUser.cart) 
            const targetProduct = {
                product: Object.keys(req.body)[0],
                quantity: 1
            }
            targetCart.products.push(targetProduct)
            await cartsService.UpdateCart(targetCart._id, targetCart)
        } else {
            res.render('./failures/notLogged')
        }
    } catch(error) {
        console.log(error)
    }   
}

export default {
    addProduct
}