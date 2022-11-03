import { Router } from "express";
import productService from "../models/Products.js";

const router = Router()
router.get('/', async (req, res) => {
    if(!req.session.user){
        res.render('endpoints/home')
    }else{
        res.redirect('endpoints/user')
    }    
})

router.get('/products', async (req, res) => {
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
})
router.get('/api/register', (req, res) => {
    res.render('endpoints/register')
})
router.get('/api/login', (req, res) => {
    res.render('endpoints/login')
})
router.get('/api/user', (req,res) => {
    if(!req.session.user) return res.redirect('/login');
    res.render('endpoints/user', {user: req.session.user})
})
router.get('/api/loginfail', (req,res) =>{
    res.render('failures/loginFail')
})
router.get('/api/registerfail', (req,res) =>{
    res.render('failures/registerFail')
})
export default router