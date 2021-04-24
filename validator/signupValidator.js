const { body } = require('express-validator')
const User = require('../models/Users')

exports.validatorSignUp = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name field cannot be empty')
        .isLength({ min: 2 })
        .withMessage('name must be greater than 2 character')
        .trim(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email field Cannot be empty')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail()
        .custom( async email => {
            let user = await User.findOne({email})
            if(user){
                return Promise.reject('User with this email already exists')
            }
            return true
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password field Cannot be empty')
        .isLength({min:4})
        .withMessage('Password field must be greater than 5 character'),
    body('confirmPassword')
        .not()
        .isEmpty()
        .withMessage('Confirm Password field Cannot be empty')
        .custom((val, {req}) => {
            if(val !== req.body.password){
                throw new Error('Password not matched!!')
            }
            return true
        })
]