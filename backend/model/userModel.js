const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    image:{
        type:String,
        require:true
    }
})

const userModel = mongoose.model('imageDetails',userSchema)
module.exports = userModel