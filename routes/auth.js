const express= require('express')
var router= express.Router()
const { check }= require('express-validator')
const { signup, signin, signout, isSignedIn }= require('../controllers/auth')

router.post(
    '/signup',
    [
        check("name", "Name should be of min 3 characters.").isLength({ min: 3 }),
        check("email","Email is Required.").isEmail(),
        check("phone", "Phone should be of 10 digits exactly.").isLength({ min:10, max:10 }),
        check("password", "Password should be of min 6 characters.").isLength({ min: 6 })
    ],
    signup
)

router.post(
    '/signin',
    [
        check("email","Email is required!!").isEmail(),
        check("password", "Password Required!!").isLength({ min: 1 })
    ],
    signin
)

module.exports= router