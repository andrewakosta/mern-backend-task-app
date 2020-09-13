//Route to auth users
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')
const auth = require('../middleware/auth')

router.post('/',
    authController.userAuthenticate
)
router.get('/',
    auth,
    authController.getUserAuthenticate

)
module.exports = router