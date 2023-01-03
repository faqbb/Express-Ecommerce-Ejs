import { cartsService, usersService } from "../service/indexService.js";


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
            if (!user.address&&!user.email) {
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
export default {
    addProduct,
    removeCartProduct,
    finishPurchase,
    completeUserData
}