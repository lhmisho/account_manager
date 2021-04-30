const router = require('express').Router()
const { body } = require('express-validator')
const { signUpController, loginController } = require('../controllers/authController')
const { validatorSignUp } = require('../validator/signupValidator')
const loginValidator = require('../validator/loginValidator')

router.post('/signup', validatorSignUp, signUpController)

router.post('/login', loginValidator, loginController)


module.exports = router