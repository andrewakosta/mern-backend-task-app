//Route to auth users
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')
const auth = require('../middleware/auth')

router.post('/',
    [
        check('email','Insert correct Email'),
        check('password', 'Tha password is wrong')
    ],
    authController.userAuthenticate
)
router.get('/',
    auth,
    authController.userAuthenticate

)
module.exports = router