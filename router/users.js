const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {check} =require('express-validator')

router.post('/',
    [
        check('name','The name is mandatory').not().isEmpty(),
        check('email','Add an Email correct').isEmail(),
        check('password','The password must have more than 6 characters').isLength({min:6})
    ],
    userController.createUser
)

module.exports = router