const User = require('../models/User')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')


exports.createUser =  async (req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    try {
       
        let user = await User.findOne({email})

        //Check if the user already exixst
        if(user){
            return res.status(400).json({msg: 'The user already exist'})
        }
        //create a new user
        user = new User(req.body)

        //Save user
        await user.save()

        //Create an firm the JWT
        const payload = {
            user:{
                id:user.id
            }
        }
        //Firm the JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn:3600
        },(error, token) => {
            if(error) throw error

            //confiramtion message
            res.json({token})
        })

    
    } catch (error) {
        console.log(error)
        res.json({
            status:400,
            msg:'An error has ocurred'
        })
    }
}