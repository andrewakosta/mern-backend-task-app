const mongoose = require('mongoose')
const { connected } = require('process')
require('dotenv').config({path: 'variables.env'})

const connetionDB = async ()=> {
    try {
        await mongoose.connect(process.env.MongoDB,{
           useNewUrlParser:true,
           useUnifiedTopology:true,
           useFindAndModify:false 
        })
        console.log('Connection ssuccesful')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connetionDB