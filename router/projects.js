const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectsController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//Create a Project 
router.post('/',
    [
        check('name', "Project's name is madatory").not().isEmpty()
    ],
    auth,
    projectsController.createProject
)

//Get all projects 
router.get('/',
    auth,
    projectsController.getAllProjects
)
//update a project by ID
router.put('/:id',
    auth, 
    [
        check('name', "THe project's name is mandatory").not().isEmpty()
    ], 
    projectsController.updateProjectById
)


module.exports = router 