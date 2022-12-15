
import productService from "../dao/models/Products.js";
import { cartsService } from "../service/indexService.js";

const showHome = async (req, res) => {
    if(!req.session.user){
        res.render('endpoints/home')
    }else{
        res.redirect('/api/user')
    }    
}

 const showProducts = async (req, res) => {
    try {
        if(req.session.user) {
            const prods = await productService.find()
            const targetCart = await cartsService.getCartById(req.session.user.cart)
            res.render('endpoints/products', {products: prods, user: req.session.user, cart: targetCart})
        } else {
            res.render('failures/notLogged')
        }
    } catch {
        res.status(404).send((error) => console.log(error))
    }
}

const showUser = (req,res) => {
    if(!req.session.user) return res.redirect('/login');
    res.render('endpoints/user', {user: req.session.user})
}


const showCart = async(req,res) => {
    try {
        if (req.session.user) {
            const {cart} = req.session.user
            const targetCart = await cartsService.getByIdAndPopulate(cart)
            res.render('endpoints/cart', {cart:targetCart})
        } else {
            res.render('./failures/notLogged')
        }
    } catch (error) {console.log(error)}
} 
export default {
    showHome,
    showProducts,
    showUser,
    showCart
}