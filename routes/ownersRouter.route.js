const express = require('express')
const router = express.Router()
const ownerModel =require('../models/owners.model')

router.get('/',function(req,res){
    res.send('hey')
})

if(process.env.NODE_ENV === 'development'){
    router.post('/create',async function(req,res){
        const prevOwner = await ownerModel.find()
        if(prevOwner.length >0){
            return res.status(503).send('Owner already exist')
        }
        const {fullname,email,password} = req.body;
        const newOwner = await ownerModel.create(
            {
                fullname,
                email,
                password,
            }
        )
        res.status(201).send(newOwner)
    })
}
module.exports = router