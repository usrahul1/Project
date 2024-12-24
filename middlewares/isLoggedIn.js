const jwt = require("jsonwebtoken")
const userModel = require("../models/usermodel")

module.exports = async function(req, res, next) {
    if(!req.cookies.token){
        req.flash("You need to login first!")
        return res.redirect("/")
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = await userModel.findOne({email: req.body.email}).select("-password")
        req.user = user
        next()
    } catch(err){
        res.flash("Oopsie!")
        res.redirect("/")
    }
}