
const bycript = require('bcrypt')
var jwt = require('jsonwebtoken');
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

exports.loginController = async (req, res) => {
    let { email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        res.status(400).json(errors.mapped())
    } else {
        try {
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: 'Invalid credentials'})
            }
            let match = await bycript.compare(password, user.password)
            console.log(match)
            if(!match){
                return res.status(400).json({message: 'Invalid credentials'})
            }
            let token = jwt.sign({
                _id: user._id,
                email: user.email,
                name: user.name
            }, 'SECRATE', {expiresIn: '2h'})
            return res.status(200).json({
                message: 'Data successfully returned',
                statusCode: 200,
                token: `Bearer ${token}`
            })
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}