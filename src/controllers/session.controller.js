import { cartsService, usersService } from "../service/indexService.js";
import MailingService from "../service/MailingService.js";


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
        } else {res.render('./failures/notLogged')}
    } catch(error) {
        console.log(error)
    }   
}
const removeCartProduct = async(req,res) => {
    try {
        if (req.session.user) { 
            console.log('quetal')
        const targetCart = await getCartfromSession(req, res)
        const targetProduct =  Object.keys(req.body)[0]
        console.log(targetProduct)
        for (let i = 0; i < targetCart.products.length; i++) {
            if(targetCart.products[i]._id == targetProduct){
                targetCart.products.splice(i, 1)
            }
        }
        await cartsService.UpdateCart(targetCart._id, targetCart)
        } else {res.render('./failures/notLogged')}
    } catch (error) {console.log(error)}
}

const finishPurchase = async(req,res) => {
    try {
        if (req.session.user) {
            const user = await usersService.getUserByID(req.session.user.id)
            if (!(user.address)&&!(user.email)) {
                res.render('endpoints/completeUserData')
            } else {
                const cart = await cartsService.getByIdAndPopulate(user.cart)
                res.render('endpoints/verifyData', {user: user ,cart: cart})
            }
        } else {
            res.render('./failures/notLogged')
        }
    } catch (error) {console.log(error)}
}

const completeUserData = async(req, res) => {
    try {
        if (req.session.user) {
            const newUserData = req.body
            await usersService.updateUserAddress(req.session.user.id, newUserData.address)
            await usersService.updateUserEmail(req.session.user.id, newUserData.email)
            res.redirect('/api/finishPurchase')
        } else {
            res.render('./failures/notLogged')
        }
    } catch (error) {console.log(error)}
}

const sendPurchaseOrder = async(req, res) =>{
    try {
        if (req.session.user) {
            const user = await usersService.getUserByID(req.session.user.id)
            const cart = await cartsService.getByIdAndPopulate(user.cart)
            const purchaseOrder = `<h1>Gracias por confiar en nosotros, ${user.name}</h1>
                                    <h3>Se enviaran los productos que solicitaste a ${user.address}</h3>
                                    <h5>Lista de productos:</h5>`+
                                    cart.map(function(item){
                                    return(`<div style="display:flex;width: 100px;">
                                                <div style="padding: 10px;">${item.product.name}</div>
                                                <div style="padding: 10px;">$${item.product.price}</div>
                                        </div>`)}).join(' ') + `<h2>Por favor considere enviar un mail a eeeproyect@gmail.com frente a cualquier inconveniente con su pedido</h2>`
            const mailer = new MailingService()
            let result = await mailer.sendSimpleMail({
                from: 'Ecommerce Express Ejs Proyect',
                to: user.email,
                subject: 'Su orden de compra',
                html: purchaseOrder
            })
            res.send({status: "success", message: "Email succesfully sent"})
        } else {
            res.render('./failures/notLogged')
        }
    } catch (error) {console.log(error)}
}
export default {
    addProduct,
    removeCartProduct,
    finishPurchase,
    completeUserData,
    sendPurchaseOrder
}