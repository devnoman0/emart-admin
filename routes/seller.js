const express = require('express')
const Router = express.Router()
const bcrypt = require('bcryptjs')

//Import Token Verifier
const TokenVerifier = require('./verifytoken')

//Import Seller model
const Seller  = require('../models/seller/seller')
const SellerCommission  = require('../models/seller/seller-commission')

// import validator
const {addSeller, addSellerCommission} = require('../validator/seller')


//Get All Seller Route Started
Router.get('/', TokenVerifier, async(req, res) => {
   const seller = await Seller.find()
   res.json(seller)
})

//Start Add Seller Route
Router.post('/add', TokenVerifier, async(req, res) => {

    // Lets Validate Submited Data And Call The Function
    const {error} = addSeller(req.body)
    if(error) return res.status(400).json({message : error.details[0].message})

    //Lets Check If Seller Exist
    const SellerExist = await  Seller.findOne({email : req.body.email})
    if(SellerExist) return res.status(400).json({message : "Seller Already Added"})

    //Hash The Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //New Seller Extensiate
    const seller = new Seller({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
    })

    //Save Seller To Database
    seller.save().then(res.json({message : "Seller Added Successfully"}))
})

//Start Add Seller Commission
Router.post('/commission/add', TokenVerifier, async(req, res) => {

    // Lets Validate Submited Data And Call The Function
    const {error} = addSellerCommission(req.body)
    if(error) return res.status(400).json({message : error.details[0].message})

    //New Commission Value Extensiate
    const sellerCommission = new SellerCommission({
        value : req.body.value,
    })

    //Save Seller Commission To Database
    sellerCommission.save().then(res.json({message : "Seller Commission Added Successfully"}))
})



//Delete Brand Route Started
Router.delete('/delete/:sellerid', TokenVerifier, async(req, res) => {

    //Check Brandid Validity
    try{

       //Delete Brand From Database By Catid
        const deleted = await Seller.deleteOne({ _id : req.params.sellerid })
        res.json({message : "Seller Deleted Successfully"})

    }catch(err){

        res.status(400).json({message : "Sorry Something Went Wrong"})
    }
   

})

//Get All Seller Verification Request Route Started
Router.get('/verification/request', TokenVerifier, async(req, res) => {
    /*
        TODO
        Create Model
        Get All Data From Database
    */

    res.send("Todo")
 })

 //Get All Seller Payments History Route Started
Router.get('/payments', TokenVerifier, async(req, res) => {
    /*
        TODO
        Create Model
        Get All Data From Database
    */

    res.send("Todo")
 })


//Router Exported 
module.exports = Router;