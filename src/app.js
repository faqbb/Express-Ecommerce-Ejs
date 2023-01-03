import express from 'express'
import __dirname from './utils.js'
import viewsRouter from "./routes/views.router.js";
import session from 'express-session'
import sessionsRouter from './routes/sessions.router.js'
import mongoose from "mongoose";
import MongoStore from 'connect-mongo'
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

console.log(__dirname)

const app = express()
const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:{
            title: 'E-E-E API',
            description: 'API designed for usage in the Express-EJS-Ecommerce proyect'
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsdoc(swaggerOptions)

const connection = mongoose.connect('mongodb+srv://facundito:facundito@cluster0.a6edqvs.mongodb.net/?retryWrites=true&w=majority')

app.use(express.json())
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://facundito:facundito@cluster0.a6edqvs.mongodb.net/test?retryWrites=true&w=majority',
        ttl: 600
    }),
    secret:"usersession",
    resave: true,
    saveUninitialized: true
}))

initializePassport()

app.set('view engine','ejs')
app.set('views',__dirname+'/views')

const PORT = process.env.PORT || 8080
const server = app.listen(PORT,() => console.log(`listening on ${PORT}`))

app.use(passport.initialize())
app.use(passport.session())
app.use('/', viewsRouter)
app.use('/api', sessionsRouter)
