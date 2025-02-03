const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const connection = require('./config/mongoose.connection.js')
const ownersRouter = require('./routes/ownersRouter.route.js')
const usersRouter = require('./routes/usersRouter.route.js')
const productsRouter = require('./routes/productsRouter.route.js')
const index = require('./routes/index.js')
const expressSession = require('express-session')
const flash = require('connect-flash')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.SESSION_SECRET
    })
)
app.use(flash())
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine','ejs')


//we use this middle ware to send specific routes to particular routes to make code modular and neet
app.use('/owners',ownersRouter)
app.use('/users',usersRouter)
app.use('/products',productsRouter)
app.use('/',index)

app.listen(8000,()=>{
    console.log('app is on 8000')
})