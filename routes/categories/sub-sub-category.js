const express = require('express')
const Router = express.Router()
const slugify = require('@sindresorhus/slugify');

//Import Token Verifier
const TokenVerifier = require('../verifytoken')

//Import Sub Sub Category model
const SubSubCategoris  = require('../../models/categories/sub-sub-category')

// import validator
const {SubSubcategoryAddValidation} = require('../../validator/category')


//Get All Sub Sub Category Route Started
Router.get('/', TokenVerifier, async(req, res) => {
   const SubsubCategoris = await SubSubCategoris.find()
   res.json(SubsubCategoris)
})

//Start Add Sub Sub Category Route
Router.post('/add', TokenVerifier, async(req, res) => {

    // Lets Validate Submited Data And Call The Function
    const {error} = SubSubcategoryAddValidation(req.body)
    if(error) return res.status(400).json({message : error.details[0].message})

    //Lets Check If Category Exist
    const SubsubcategoryExist = await  SubSubCategoris.findOne({name : req.body.name})
    if(SubsubcategoryExist) return res.status(400).json({message : "Sub Sub Category Already Added"})

    //Create Slug
    const newSlog = slugify(req.body.name, {separator: '-'});

    //New Sub Sub Category Extensiate
    const Subsubcategory = new SubSubCategoris({
        name : req.body.name,
        parent_category_id : req.body.parent_category_id,
        sub_parent_category_id : req.body.sub_parent_category_id,
        metaTitle : req.body.metaTitle,
        description : req.body.description,
        slug : newSlog,
    })

    //Save Sub Sub Category To Database
    Subsubcategory.save().then(res.json({message : "Sub Sub Category Added Successfully"}))
})

//Delete Sub Sub  Category Route Started
Router.delete('/delete/:subsubcatid', TokenVerifier, async(req, res) => {

    //Check Catid Validity
    try{

       //Delete Sub Sub Category From Database By Catid
        const deleted = await SubSubCategoris.deleteOne({ _id : req.params.subsubcatid })
        res.json({message : "Sub Sub Catagory Deleted Successfully"})

    }catch(err){

        res.status(400).json({message : "Sorry Something Went Wrong"})
    }
   

})


//Router Exported 
module.exports = Router;