const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        trim: true,
        minLength: 3,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    cart:{
        type:Array,
        default:[]
    },
    order:{
        type:Array,
        default:[]
    },
    contact:{
        type:Number
    },
    picture:{
        type:String
    },
})

module.exports = mongoose.model('user',userSchema)