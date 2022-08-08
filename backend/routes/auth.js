const express = require('express')
const argon2 = require('argon2')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.get('/', (req, res) => res.send('Auth Router'))

//@route POST api/auth/register
//@desc register user
//@access public

router.post('/register',async (req,res)=>{
    const {username,password} = req.body

    if(!username || !password)
    return res.status(400).json({success : false, message : 'Missing username or password'})

    try {
        //check exiting user
        const user = await User.findOne({username})
        if(user) return res.status(400).json({success : false, message : 'Username already exit'})

        const hashPassword = await argon2.hash(password)
        const newUser = new User({username, password : hashPassword})

        await newUser.save()

        //return token
        const accessToken = jwt.sign()
    } catch (error) {
        
    }
})

module.exports = router