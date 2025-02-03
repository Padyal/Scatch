const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')


module.exports.isLoggedIn = async function (req,res,next) {
     const token = req.cookie.token

     if(token){
          req.flash("error","you have to be logged in first")
          return res.redirect('/')
     }
     try{
          let decode = jwt.verify(token,process.env.JWT_KEY)
          let user = await userModel.findOne({email:decode.email}).select("-password")
          req.user = user
          next()
     }catch(err){
          req.flash("error","you have to be logged in first")
          res.redirect('/')
     }
}