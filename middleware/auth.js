const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    //read the token 
    const token = req.header('x-auth-token')
   
    //Check if there is a token 
    if(!token){
        res.status(401).send('There is not token pelase log in to get a token')
    }
    //Check token 
    try {
        const cifrate = jwt.verify(token, process.env.SECRET)
        req.user = cifrate.user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({msg: 'There is an erro with your token'})
    }
}