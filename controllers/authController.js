
const bycript = require('bcrypt')
const { checkValidation } = require('../validator/signupValidator')
const { body, validationResult } = require('express-validator')
const User = require('../models/Users')

const errorFormatter = require('../utils/validatorsErrorFormatter')

exports.signUpController = async (req, res) => {
    console.log(body)
    let { name, email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    console.log(errors)
    if (!errors.isEmpty()) {
        res.status(400).json(errors.mapped())
    } else {
        try {
            let hashedPassword = await bycript.hash(password, 11)
            let user = new User({
                name, email, password: hashedPassword
            })
            user.save()
            res.status(201).json({ user })
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

}