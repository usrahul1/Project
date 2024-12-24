const express = require('express')
const router = express.Router()
const ownerModel = require("../models/ownermodel")

if(process.env.NODE_ENV === "development"){
    router.post("/create", async (req, res)=>{
        let owners = await ownerModel.find()
        if(owners.length > 0) {
            return res.status(503).send("Cannot add more than 1 owner.")
        }
        let {name, email, password} = req.body
        let createdOwner = await ownerModel.create({
            name,
            email,
            password,
        })
        res.status(201).send(createdOwner)
    })
}

router.get("/admin", (req, res)=>{
    let success=req.flash("success")
    res.render("createproducts", {success})
})

router.get("/", (req, res) => {
    res.send("hey its working")
})

module.exports = router