const mongoose = require('mongoose')

mongoose.connect(`${process.env.MONGODB_URL}/scatch`)
.then(function(){
    console.log('MongoDb connected')
})
.catch(function(err){
    console.log(err)
})

module.exports = mongoose.connection