const express = require("express");
const Router = express.Router();
const AWS = require("aws-sdk");
const Busboy = require("busboy");
const slugify = require("@sindresorhus/slugify");

const BUCKET_NAME = "backpagellc";
const IAM_USER_KEY = "AKIA2QZ2B7OURCKUI7Q6";
const IAM_USER_SECRET = "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";

//Require .env File
require("dotenv").config();

//Import Token Verifier
const TokenVerifier = require("../verifytoken");

//Import Category model
const Categoris = require("../../models/categories/category");

// import validator
const { categoryAddValidation } = require("../../validator/category");

//Get All Category Route Started
Router.get("/", TokenVerifier, async (req, res) => {
  const catagories = await Categoris.find();
  res.json(catagories);
});

//Start Add Category Route
Router.post("/add", TokenVerifier, async (req, res) => {
  // Lets Validate Submited Data And Call The Function
  const { error } = categoryAddValidation(req.body);
  if (error) return res.status(500).json({ message: error.details[0].message });

  //Lets Check If Category Exist
  const categoryExist = await Categoris.findOne({ name: req.body.name });
  if (categoryExist)
    return res.status(500).json({ message: "Category Already Added" });

  //Create Slug
  const newSlog = slugify(req.body.name, { separator: "-" });

  const busboy = new Busboy({ headers: req.headers });

  busboy.on("finish", function() {
    const file = req.files.iconimage;
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    });
    const newFileName = Date.now() + file.name;
    s3bucket.createBucket(function() {
      var params = {
        Bucket: BUCKET_NAME,
        Key: newFileName,
        Body: file.data
      };

      s3bucket.upload(params, function(err, data) {
        if (err) {
          res.status(500).json({ msg: "Something went wrong try again" });
		  console.log(err)
        }
        // New Category Extensiate
        const category = new Categoris({
          name: req.body.name,
          iconUrl: data.Location,
          metaTitle: req.body.metaTitle,
          description: req.body.description,
          slug: newSlog
        });
		console.log(category)
        category.save().then(res.json(category));
      });
    });
  });

  req.pipe(busboy);
});

//Delete Category Route Started
Router.delete("/delete/:catid", TokenVerifier, async (req, res) => {
  //Check Catid Validity
  try {
    //Delete Category From Database By Catid
    const deleted = await Categoris.deleteOne({ _id: req.params.catid });
    res.json({ message: "Catagory Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Sorry Something Went Wrong" });
  }
});

//Router Exported
module.exports = Router;
