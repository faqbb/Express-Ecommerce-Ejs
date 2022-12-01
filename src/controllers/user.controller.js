import { usersService } from "../service/indexService.js";

const getUsers = async(req,res) => {
    let users = await usersService.getUsers()
    res.send({status:"success", payload: users})
}

const getUserByID = async(req,res) =>{
    const {id} = req.params
    const user = await usersService.getUserByID(id)
    if(!user) return res.status(404).send({status:"error", error: "User not found"})
    else return res.send({status:"success", payload: user})
}

const getUserByEmail = async(req,res) =>{
    const {email} = req.params
    const user = await usersService.getUserByEmail(email)
    if(!user) return res.status(404).send({status:"error", error: "User not found"})
    else return res.send({status:"success", payload: user})
}
const saveUser = async(req,res) => {
    const newUser = req.body
    const user = await usersService.saveUser(newUser)
    if(!user) return res.status(404).send({status:"error", error: "Cannot create user"})
    else return res.send({status:"success", payload: user})
}

export default {
    getUsers,
    getUserByEmail,
    getUserByID,
    saveUser
}