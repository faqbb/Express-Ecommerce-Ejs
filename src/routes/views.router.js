import { Router } from "express";
import viewsController from '../controllers/views.controller.js'
 
const router = Router()

router.get('/api/products', viewsController.showProducts)

router.get('/api/user', viewsController.showUser)

router.get('/', viewsController.showHome)

router.get('/api/register', (req, res) => {
    res.render('endpoints/register')
})
router.get('/api/login', (req, res) => {
    res.render('endpoints/login')
})
router.get('/api/loginfail', (req,res) =>{
    res.render('failures/loginFail')
})
router.get('/api/registerfail', (req,res) =>{
    res.render('failures/registerFail')
})

export default router