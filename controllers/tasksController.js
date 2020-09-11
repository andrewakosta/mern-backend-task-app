const  Task = require('../models/Task')
const Project = require('../models/Project')
const {validationResult} = require('express-validator')

//Create task
exports.createTask = async (req, res) => {
    const errors  = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    return res.status(200).send(req.body.name)
}