const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectsController')

//Create a Project 
router.post('/',
    projectsController.createProject
)


module.exports = router