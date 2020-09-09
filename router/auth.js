//Route to auth users
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')

router.post('/',
    [
        check('email','Insert correct Email'),
        check('password', 'Tha password is wrong')
    ],
    authController.userAuthenticate
)
module.exports = router