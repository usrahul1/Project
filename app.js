const express = require('express')
const app = express()
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const ownersRouter = require('./routes/ownersRouter')
const productsRouter = require('./routes/productsRouter')
const usersRouter = require('./routes/usersRouter')
const indexRouter = require('./routes/index')
const expressSession = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()


const db = require('./config/mongoose-connection')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash())

app.use("/", indexRouter)
app.use("/owners", ownersRouter)
app.use("/products", productsRouter)
app.use("/users", usersRouter)

// app.get("/", (req, res) => {
//     res.render("index")
// })


app.listen(3000)