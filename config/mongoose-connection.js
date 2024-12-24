const mongoose = require('mongoose')
const config = require('config')
const debgr = require('debug')("development: mongoose")


//To use dbgr: run => export DEBUG=development:*
mongoose
.connect(`${config.get("MONGODB_URI")}/project`)
.then(function(){
    debgr("connected")
})
.catch(function(err){
    console.log(err)
})

module.exports = mongoose.connection