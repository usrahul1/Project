const userModel = require("../models/usermodel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/generateToken")

module.exports.registerUser = async (req, res) => {
    try {
        let {name, email, password} = req.body
        let user = await userModel.find({email: email})
        console.log(user)
        if(user.length>0)return res.status(502).send("You already have an account!")
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) res.send(err.message)
                else {
                    let createdUser = await userModel.create({
                        name,
                        email,
                        password: hash
                    })
                    let token = generateToken(createdUser)
                    res.cookie("token", token)
                    res.send(createdUser)
                }
            })
        })

    } catch(err) {
        res.send(err)
    }
}

module.exports.loginUser = async (req, res) => {
    try{
        let {email, password} = req.body
        let user = await userModel.findOne({email: req.body.email})
        if(!user){
            let error = req.flash("Incorrect password or username")
            return res.render("index", {error})
        }
        let hash = user.password
        bcrypt.compare(req.body.password, hash, (err, result) =>{
            if(!result) res.status(502).send("Oops! Try again2.")
            else {
                let token = generateToken(user)
                res.cookie("token", token)
                res.status(202).render("shop")
            }
        })
    }
    catch(err) {
        res.send(err.message);
        
    }
}

module.exports.logOut = (req, res)=>{
    let token = ""
    res.cookie("token", token)
}