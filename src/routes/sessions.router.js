import { Router } from "express";
import userService from "../models/User.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router()

router.post('/register', passport.authenticate('register',{failureRedirect:'/api/registerfail'}), async (req, res) => {
    console.log('hola')
})
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/loginfail'}), async (req, res) => {
            req.session.user = {
                name: req.user.name,
                email: req.user.email,
                id: req.user._Id
            }
            res.send({status:'success', payload: req.session.user})
        })

router.get('/user', (req,res) =>{
    if(req.session.user){
        loggedUser = req.session.user
        res.send(loggedUser)
    }
    else {
        res.status(400).send({status:"error", error: "User not logged in"})
        res.redirect('/api/login')
    }
})

router.get('/logout', (req,res) =>{
    req.session.destroy()
    res.redirect('/')
})

router.get('/github', passport.authenticate('github', {scope:[]}), async(req,res) =>{
    console.log('aver')
})

router.get('/githubcallback', passport.authenticate('github'), (req,res) =>{
    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id,
        cart: req.user.cart
    }
    res.redirect('/api/user')
})

router.post('/addProduct', (req,res) =>{
    console.log(req.body)
    res.send('repiola')
})

export default router