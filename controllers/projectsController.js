const Project = require("../models/Project")
const {validationResult} = require('express-validator')


exports.createProject = async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    try {
        const project = new Project(req.body)

        //Set User 
        project.creator = req.user.id
        //Save Project 
        await project.save()
        res.json(project)

    } catch (error) {
        console.log(error)
        res.status(500).send('An error has courred')
    }
}
//Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        
        const projects = await Project.find({creator: req.user.id})
        res.json({projects})
    } catch (error){
        console.log(error)
    }
}

//Update a project by id 
exports.updateProjectById = async (req, res) => {
    
    //Check for any error
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    //Get information from project
    const {name} = req.body
    const newProject = {}

    if(name){
        newProject.name = name;
    }
    try {
        //Check ID
        let project = await Project.findById(req.params.id)

        //if project exist or no
        if(!project){
            return res.stauts(404).json({msg:'Project not found'})
        }
        //Check the creator of project
        if(project.creator.toString() !== req.user.id){
            return res.status(500).json({msg:'Unauthorized access'})
        }
        //update
        project = await Project.findByIdAndUpdate({_id: req.params.id},
                                                  { $set: newProject},
                                                  { new:true})
        res.json(project)                                          
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'Internal server error'})
    }
}

//Delete a project 
 exports.deleteProject = async (req, res) => {
     try {
        //Check by ID
        let project = await Project.findById(req.params.id)
        
        //Check if porject exist or not
        if(!project){
            return res.status(404).json({msg: 'Project not found'})
        }
        //Check by the creator of project
        if(project.creator.toString() !==  req.user.id){
            return res.status(401).json({msg:'Unathorized access'})
        }
        //Delete the project
        await Project.findByIdAndRemove({_id:req.params.id})
        res.json({msg:'Project remove ssuccesful'})
     } catch (error) {
        console.log(error)
        return res.status(500).send('Internagl server error')
     }
 }