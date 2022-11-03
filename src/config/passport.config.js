import passport from "passport";
import local from 'passport-local'
import userService from "../models/User.js";
import { createHash, isValidPassword } from "../utils.js"
import github from 'passport-github'

const LocalStrategy = local.Strategy
const GitHubStrategy = github.Strategy


const initializePassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:"email"}, 
    async(req, email, password, done)=>{
        const {name} = req.body
        if(!name||!email||!password) return done(null, false,{message:"Incomplete values"})
            const exists = await userService.findOne({email:email})
        if(exists) return done(null,false, {message:"User already exists"})
            const newUser = {
                name,
                email,
                password:createHash(password),
                cart: []
            }
        let result = await userService.create(newUser)
        console.log(result)
        return done(null,result)
    }))

    passport.use('login', new LocalStrategy({usernameField:'email'}, async(email, password, done)=>{
        if(!email||!password) return done(null,false,{message:"Incomplete values"})
        let user = await userService.findOne({email:email})
        if(!user) return done(null,false,{message:"User not found"})
        if (!isValidPassword(user, password)) return done(null, false, {message:"Incorrect password"})
        return done(null, user)
    }))

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.49dada7375e86952',
        clientSecret: '161800cfcaf1d780976ec134e273eb8ac96c1038',
        callbackURL: 'http://localhost:8080/api/githubcallback'
    },async(accessToken, refreshToken, profile, done) => {
        const {name, email} = profile._json
        let user = await userService.findOne({email:email})
        if(!user){
            let newUser = {
                name,
                email,
                password:'',
                cart: [],
            }
            let result = await userService.create(newUser)
            return done(null,result)
        }else{
            return done(null,user)
        }
    }))

    passport.serializeUser((user,done) => {
           done(null, user._id)
        })

    passport.deserializeUser(async(id,done)=>{
            let result = await userService.findOne({_id:id})
            return done(null, result)
        })

}

export default initializePassport