import passport from "passport";
import local from 'passport-local'
import {usersService} from "../service/indexService.js";
import { cartsService } from "../service/indexService.js";
import { createHash, isValidPassword } from "../utils.js"
import github from 'passport-github'

const LocalStrategy = local.Strategy
const GitHubStrategy = github.Strategy


const initializePassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:"email"}, 
    async(req, email, password, age, address, done)=>{
        const {name} = req.body
        if(!name||!email||!password||!age||!address) return done(null, false,{message:"Incomplete values"})
        const exists = await usersService.getByEmail(email)
        if(exists) return done(null,false, {message:"User already exists"})
        const cart = await cartsService.createCart()
            const newUser = {
                name,
                email,
                age,
                address,
                password:createHash(password),
                cart: cart._id,
                role: 'user'
            }
        let result = await usersService.saveUser(newUser)
        return done(null,result)
    }))

    passport.use('login', new LocalStrategy({usernameField:'email'}, async(email, password, done)=>{
        if(!email||!password) return done(null,false,{message:"Incomplete values"})
        let user = await usersService.getUserByEmail(email)
        if(!user) return done(null,false,{message:"User not found"})
        if (!isValidPassword(user, password)) return done(null, false, {message:"Incorrect password"})
        return done(null, user)
    }))

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.49dada7375e86952',
        clientSecret: '161800cfcaf1d780976ec134e273eb8ac96c1038',
        callbackURL: 'http://localhost:8080/api/githubcallback'
    },async(accessToken, refreshToken, profile, done) => {
        const {name, email, avatar_url} = profile._json
        let user = await usersService.getUserByEmail(email)
        if(!user){
            const cart = await cartsService.createCart()
            let newUser = {
                name,
                email,
                age: '',
                address: '',
                password:'',
                cart: cart._id,
                profilePic: avatar_url
            }
            
            let result = await usersService.saveUser(newUser)
            return done(null,result)
        }else{
            return done(null,user)
        }
    }))

    passport.serializeUser((user,done) => {
           done(null, user._id)
        })

    passport.deserializeUser(async(id,done)=>{
            let result = await usersService.getUserByID(id)
            return done(null, result)
        })

}

export default initializePassport