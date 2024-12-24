const express = require('express')
const router = express.Router()
const isLoggedIn = require("../middlewares/isLoggedIn")
const productmodel = require('../models/productmodel')

router.get("/", (req, res)=>{
    let error = req.flash("Error")
    res.render("index", {error})
})

router.get("/shop", isLoggedIn, async (req, res)=>{
    let products = await productmodel.find()
    res.render("shop", {products})
})

// router.get("/logout", isLoggedIn, (req, res)=>{
//     res.render()
// })

module.exports = router