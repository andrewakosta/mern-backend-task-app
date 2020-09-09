const User = require('../models/User')


exports.createUser =  async (req,res) => {

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

        res.json({msg:'The user was created'})
    } catch (error) {
        console.log(error)
        res.json({
            status:400,
            msg:'An error has ocurred'
        })
    }
}