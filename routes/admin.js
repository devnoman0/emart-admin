const express = require('express')
const Router = express.Router()
const Jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// Import Admin model
const Admins  = require('../models/admin')

// import validator
const {adminAddValidation, adminLoginValidation} = require('../validator/admin')

// Admin Add Route Started
Router.post('/add', async (req, res)=>{

    // Lets Validate Submited Data And Call The Function
    const {error} = adminAddValidation(req.body)
    
    //Check If The Email Already Used
    const emailUsed = await Admins.findOne({ email : req.body.email })
    if(emailUsed) return res.status(400).json({message : "Email Already Exists"})


    //Check If The Username Already Used
    const usernameUsed = await  Admins.findOne({username : req.body.username})
    if(usernameUsed) return res.status(400).json({message : "Username Already Exists"})
    
    //Check If Error Has Occured
    if(error){
    
        res.status(400).json({message :error.details[0].message })
      
    }else {

      //Hash The Password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      

      // New Admin Extensiate
      const newAdmin = new Admins({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : hashedPassword,
        });
        // Save New Admin To Database
       newAdmin.save().then(res.json({message : "Admin Added Successfully"}))

    }

  });


// Admin Login Route Started
Router.post('/login', async(req, res) => {

    // Lets Validate Submited Data And Call The Function
    const { error } = adminLoginValidation(req.body)
    if(error) return res.json({message : error.details[0].message })

    //Lets Check If Email Exist
    const user = await  Admins.findOne({email : req.body.email})
    if(!user) return res.json({message : { invalid : "Username Or Password Invalid" }})

    //Validate Password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.json({message : { invalid : "Username Or Password Invalid" }})
    

    //Create And Assign Token
    const token = Jwt.sign({_id : user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).json({token : token})
})

// Router Exported 
module.exports = Router;