const  Task = require('../models/Task')
const Project = require('../models/Project')
const {validationResult} = require('express-validator')

//Create task
exports.createTask = async (req, res) => {

    const errors  = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    

   

    try {
        //Extract the proyect and check if exist
        const {project} = req.body
        const projectDB = await Project.findById(project)
        if(!projectDB){
            return res.status(404).json({msg:'Project not found'})
        }

        //Check if current project belong to autenticated user
        if(projectDB.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'Unauthoried access'})
        }

        //Create the task
        const task = new Task(req.body)
        await task.save()
        res.json({task})

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'Maybe you need check your fileds because an error has ocurred'})
    }

}
exports.getAllTasks = async (req,res) => {
    try {
        const {project} = req.body
        const projectDB = await Project.findById(project)

        if(!projectDB){
            return res.status(404).json({msg:'Project not found'})
        }
        if(projectDB.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'Unathorized access'})
        }
       //Get task of the project
       const tasks = await Task.find({project})
       res.json({tasks}) 
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'An erros has ocurred'})
    }
}