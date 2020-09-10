const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectsController')
const auth = require('../middleware/auth')

//Create a Project 
router.post('/',
    auth,
    projectsController.createProject
)
router.get('/',
    auth,
    projectsController.createProject
)


module.exports = router 