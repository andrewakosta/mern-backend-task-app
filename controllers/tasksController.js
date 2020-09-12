const  Task = require('../models/Task')
const Project = require('../models/Project')
const {validationResult} = require('express-validator')
const { exception } = require('console')

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

//Update a task 
exports.updateTask = async (req, res)=> {
    try{
        const {project, name, status} = req.body

        //Check if task exist
        let task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({msg:'Task not found'})
        }

        //Get Project
        const projectDB = await Project.findById(project)

        //Check if the current porject belong to autenticate user
        if(projectDB.creator.toString() !== req.user.id){
            return res.status(404).json({msg:'Unuthorized access'})
        }
        //Update task
        const newTask = {}
        if(name)newTask.name = name
        if(status)newTask.status = status

        //Save task
        task = await Task.findByIdAndUpdate({_id:req.params.id}, newTask, {new:true})
        return res.status(200).json(task)
    }catch(error){
        console.log(error)
        res.status(500).json({msg:'An erro has ocurred'})
    }
}

//Delete a task
exports.deleteTask = async (req, res)=> {
    try{

        const {project} = req.body

        let task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({msg:'Task not found'})
        }

        const projectDB = await Project.findById(project)

        //Check the auth
        if(projectDB.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'Unauthorized access'})
        }

        await Task.findByIdAndRemove({_id: req.params.id})
        return res.status(200).json({msg:'Task deleted ssuccesful'})
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:'The task culd not be deleted'})
    }
}