import { cartsService, usersService } from "../service/indexService.js";
import Swal from "sweetalert2";


const getCartfromSession = async(req, res) =>{
    const {id} = req.session.user
    const targetUser = await usersService.getUserByID(id) 
    const targetCart = await cartsService.getCartById(targetUser.cart)
    return targetCart 
}

const addProduct = async(req,res) => {
    try {
        if (req.session.user) {
            const targetCart = await getCartfromSession(req, res)
            const targetProduct = {
                product: Object.keys(req.body)[0],
                quantity: 1
            }
            targetCart.products.push(targetProduct)
            await cartsService.UpdateCart(targetCart._id, targetCart)
            Swal.fire({
                title: '¡Producto agregado!',
                icon: 'success',
                timer: 1700
            })
        } else {res.render('./failures/notLogged')}
    } catch(error) {
        console.log(error)
    }   
}
const removeCartProduct = async(req,res) => {
    try {
        if (req.session.user) { 
        const targetCart = await getCartfromSession(req, res)

        } else {res.render('./failures/notLogged')}
    } catch (error) {console.log(error)}
}

export default {
    addProduct
}