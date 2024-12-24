const jwt = require("jsonwebtoken")

module.exports.generateToken = (user) => {
    console.log(user.email)
    return jwt.sign({email: user.email, userid: user._id}, process.env.JWT_KEY)
}