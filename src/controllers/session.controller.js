import { cartsService, usersService, productsService } from "../service/indexService.js";

const addProduct = async(req,res) => {
    try {
        if (req.session.user) {

            const {id} = req.session.user
            const targetUser = await usersService.getUserByID(id)
            const targetProdId = Object.keys(req.body)[0]
            const targetProd = {
                product: await productsService.getProductByID(targetProdId),
                quantity: 1
            } 
            const popCart = await cartsService.getPopulatedCart(targetUser.cart)
            const addedProductCart = await cartsService.addProductToCart(popCart, targetProd)
            console.log(addedProductCart)
            const updatedCart = await cartsService.UpdateCart(popCart.id, addedProductCart)
            console.log(updatedCart)
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