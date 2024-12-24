const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength : 3,
        trim: true,
    },    
    age: Number,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    contact: Number,
    picture: String,
    orders: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("user", userSchema)