
import productService from "../dao/models/Products.js";

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
            res.render('endpoints/products', {products: prods, user: req.session.user})
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

export default {
    showHome,
    showProducts,
    showUser
}