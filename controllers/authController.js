
const { checkValidation } = require('../validator/signupValidator')
const { body, validationResult } = require('express-validator')

const errorFormatter  = require('../utils/validatorsErrorFormatter')

exports.signUpController = (req, res) =>{
    console.log(body)
    // let {name, email, password, confirmPassword} = req.body 
    
    let errors = validationResult(req).formatWith(errorFormatter)
    console.log(errors)
    if(!errors.isEmpty()){
        res.status(400).json(errors.mapped())
    }else{
        res.status(200).json({messages: 'Signup successfull'})
    }

}