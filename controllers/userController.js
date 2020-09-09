const User = require('../models/User')


exports.createUser =  async (req,res) => {
    try {
        let user
        //create a new user
        user = new User(req.body)

        //Save user
        await user.save()

        res.status(200).send('The user has been created ssuccesful')
    } catch (error) {
        console.log('An erro has ocurred')
        res.status(400).send('An erro has ocurred')
    }
}