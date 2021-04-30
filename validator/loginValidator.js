const { body } = require('express-validator')
const User = require('../models/Users')

module.exports = [
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
        .withMessage('Password field must be greater than 5 character')
]