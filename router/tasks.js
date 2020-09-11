const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasksController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//Create a task
router.post('/',
    auth, 
    [
        check('name','The name is madatory').not().isEmpty()
    ],
    taskController.createTask
)

module.exports = router