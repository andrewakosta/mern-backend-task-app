const User = require('../models/User')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')


exports.userAuthenticate = async (req, res)=> {
 
    const {email, password} = req.body

    try{
        //Check if the user is registered
        let  user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:'The E-amil is wrong'})
        }
        //Check the password 
        if(password !== user.password){
            res.status(404).json({msg:'THe password is wrong'})
        }
        //If evrething is okay create & firm token
        const payload = {
            user:{
                id:user.id
            }
        }
        //Firm token
        jwt.sign(payload, process.env.SECRET,{
            expiresIn:3600 // one hour
        }, (error, token) => {
            if(error) throw error;

            //response with token 
            res.json({token})
        })
    }catch(error){
        console.log(error)
    }
}
//Get teh user authenticated
exports.getUserAuthenticate = async (req, res) => {
    try {
       const user = await  User.findById(req.user.id).select('-password')
       res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'An error has ocurred'})
    }
} 