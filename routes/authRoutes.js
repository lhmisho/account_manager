const router = require('express').Router()
const { body } = require('express-validator')
const { signUpController } = require('../controllers/authController')
const { validatorSignUp } = require('../validator/signupValidator')


router.post('/signup', validatorSignUp, signUpController)

router.post('/login', (req, res) => {

})


module.exports = router