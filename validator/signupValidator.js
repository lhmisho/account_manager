const { body } = require('express-validator')

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
        .normalizeEmail(),
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