import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";

const router = Router()

router.post('/register', passport.authenticate('register'), async (req, res) => {
    try{
        console.log(req.body)
        res.send({status:"success"})
    } catch(error){console.log(error)}
})

router.post('/login',passport.authenticate('login'), async (req, res) => {
    console.log(req.body)
            req.session.user = {
                name: req.user.name,
                email: req.user.email,
                id:req.user._id,
                cart: cart._id,
                profilePic: req.user.profilePic,
                age: req.user.age,
                address: req.user.address
            }
            res.send({status:'success', payload: req.session.user})
            res.redirect('/api/user')
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
    res.send({status:"success"})
})

router.get('/githubcallback', passport.authenticate('github'), (req,res) =>{
    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id,
        cart: req.user.cart || [],
        profilePic: req.user.profilePic,
        age: req.user.age,
        role: req.user.role
    }
    req.session.save()
    res.redirect('/api/user')
})
router.get('/finishPurchase', sessionController.finishPurchase)
router.post('/addProduct', sessionController.addProduct)
router.post('/removeCartProduct', sessionController.removeCartProduct)
router.post('/completeUserData', sessionController.completeUserData)

export default router