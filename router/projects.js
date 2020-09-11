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
router.get('/',
    auth,
    projectsController.createProject
)


module.exports = router 