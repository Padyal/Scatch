const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser')
const tokenGenerator = require('../utils/generatToken')
const generateToken = require('../utils/generatToken')

module.exports.registerUser = async function(req,res){
    try{
        const {email,password,fullname} = req.body

        const prevUser = await userModel.findOne({$or:[{email},{fullname}]})

        if(prevUser) return res.status(401).send('User already exist with same cred')

        bcrypt.genSalt(10,function(err,salt){
            if(err) return res.send(err.message)
            
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message)
                else{
                    const user= await userModel.create({
                        email,
                        password:hash,
                        fullname,
                    })
                    const token = tokenGenerator(user)
                    res.cookie('token',token)
                    res.status(200).send('user created')
                }
            })
        })
    }catch(err){
        res.send(err.message)
    }
     
}

module.exports.loginUser = async function(req,res){
    const {email,password} = req.body;

    const prevUser = await userModel.findOne({email})

    if(!prevUser) return res.status('401').send('Email or password incorrect')
    
    bcrypt.compare(password,prevUser.password,function(err,result){
        if(err) return res.send(err.message)
        
        if(result){
            const token = generateToken(prevUser)
            res.cookie("token",token)
            res.status(200).render('shop')
        }else{
            res.send('Email or password in correct')
        }
    })
}