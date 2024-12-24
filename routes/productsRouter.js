const express = require('express')
const router = express.Router()
const upload = require("../config/multer-config")
const productModel = require("../models/productmodel")

router.get("/", (req, res) => {
    res.render
})

router.post("/create", upload.single("image"), async (req, res) => {
    try {
    let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body
    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    })
    let success = req.flash("success" ,"created succesfully!")
    res.redirect("/owners/admin")
    } catch(err){
        res.err(err.message)
    }
})

module.exports = router