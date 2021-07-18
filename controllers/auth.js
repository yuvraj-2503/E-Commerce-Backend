//require('dotenv').config()
const User= require('../models/user')
const { check, validationResult }= require('express-validator')
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup= (req,res) => {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }
    const user= User(req.body)
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                error: "Failed to save user data!!"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
            role: user.role
        })
    })
}

exports.signin= (req,res) => {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }
    const {email,password}= req.body

    User.findOne({ email: email, password: password }, (err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found!! Invalid Email/Password.."
            })
        }

        // create token
        const token= jwt.sign({ _id: user._id }, process.env.SECRET )

        // put token in cookie
        res.cookie("token", token , { httpOnly: true, expire: new Date()+9999 })

        // req.session.user= user;
        // send response to frontend
        const {_id,name,email,role}= user
        return res.status(200).json({
            token,
            user: {_id,name,email,role}
        })
    })
}

exports.signout = (req,res) => {
    res.clearCookie("token")
    res.json({ message : "User sign out successfully!!" })
}