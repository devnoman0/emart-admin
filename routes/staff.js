const express = require('express')
const Router = express.Router()
const bcrypt = require('bcryptjs')

//Import Token Verifier
const TokenVerifier = require('./verifytoken')

//Import Staff model
const Staff  = require('../models/staff/addstaff')
const StaffRole  = require('../models/staff/roles')

// import validator
const {addStaff, addStaffRole} = require('../validator/staff')


//Get All Staff Route Started
Router.get('/', TokenVerifier, async(req, res) => {
   const staff = await Staff.find()
   res.json(staff)
})

//Start Add Staff Route
Router.post('/add', TokenVerifier, async(req, res) => {

    // Lets Validate Submited Data And Call The Function
    const {error} = addStaff(req.body)
    if(error) return res.status(400).json({message : error.details[0].message})

    //Lets Check If Staff Exist
    const StaffExist = await  Staff.findOne({email : req.body.email})
    if(StaffExist) return res.status(400).json({message : "Staff Already Added"})

    //Hash The Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //New Staff Extensiate
    const staff = new Staff({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
        role : req.body.role
    })

    //Save Staff To Database
    staff.save().then(res.json({message : "Staff Added Successfully"}))
})

//Delete Staff Route Started
Router.delete('/delete/:staffid', TokenVerifier, async(req, res) => {

    //Check staffid Validity
    try{

       //Delete Staff From Database By Catid
        const deleted = await Staff.deleteOne({ _id : req.params.staffid })
        res.json({message : "Staff Deleted Successfully"})

    }catch(err){

        res.status(400).json({message : "Sorry Something Went Wrong"})
    }
})  

//Get All Staff Roles Route Started
Router.get('/roles/', TokenVerifier, async(req, res) => {
    const staffrole = await StaffRole.find()
    res.json(staffrole)
 })

//Start Add Staff Roles Route
Router.post('/roles/add', TokenVerifier, async(req, res) => {

    // Lets Validate Submited Data And Call The Function
    const {error} = addStaffRole(req.body)
    if(error) return res.status(400).json({message : error.details[0].message})

    //Lets Check If Staff Role Exist
    const StaffRoleExist = await  StaffRole.findOne({name : req.body.name})
    if(StaffRoleExist) return res.status(400).json({message : "Role Already Added"})


    //New Staff Role Extensiate
    const staffrole = new StaffRole({
        name : req.body.name,
        permission : req.body.permission
    })

    //Save Staff To Database
    staffrole.save().then(res.json({message : "Staff Added Successfully"}))
})

//Router Exported 
module.exports = Router;