const express = require("express");
const Router = express.Router();
const AWS = require("aws-sdk");
const Busboy = require("busboy");
const slugify = require("@sindresorhus/slugify");

const BUCKET_NAME = "backpagellc";
const IAM_USER_KEY = "AKIA2QZ2B7OURCKUI7Q6";
const IAM_USER_SECRET = "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";

//Import Token Verifier
const TokenVerifier = require("./verifytoken");

//Import SBrands model
const Brands = require("../models/brands");

// import validator
const { addBrands } = require("../validator/brands");

//Get All Brands Route Started
Router.get("/", TokenVerifier, async (req, res) => {
  const brands = await Brands.find();
  res.json(brands);
})

//Start Add Brand Route
Router.post("/add", TokenVerifier, async (req, res) => {
  // Lets Validate Submited Data And Call The Function
  const { error } = addBrands(req.body);
  if (error) return res.status(500).json({ message: error.details[0].message });

  //Lets Check If Brand Exist
  const BrandsExist = await Brands.findOne({ name: req.body.name });
  if (BrandsExist)
    return res.status(500).json({ message: "Brands Already Added" });

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
        }

        //New Brands Extensiate
        const brands = new Brands({
          name: req.body.name,
          logoUrl: data.Location,
          metaTitle: req.body.metaTitle,
          description: req.body.description,
          slug: newSlog
        });
        //Save Brand To Database
        brands.save().then(res.status(201).json(brands));
      });
    });
  });

  req.pipe(busboy);
});

//Delete Brand Route Started
Router.delete("/delete/:brandid", TokenVerifier, async (req, res) => {
  //Check Brandid Validity
  try {
    //Delete Brand From Database By Catid
    const deleted = await Brands.deleteOne({ _id: req.params.brandid });
    res.json({ message: "Brands Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Sorry Something Went Wrong" });
  }
});

//Router Exported
module.exports = Router;
