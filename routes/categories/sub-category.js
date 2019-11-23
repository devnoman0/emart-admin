const express = require("express");
const Router = express.Router();
const slugify = require("@sindresorhus/slugify");

//Import Token Verifier
const TokenVerifier = require("../verifytoken");

//Import Category model
const SubCategoris = require("../../models/categories/sub-category");

// import validator
const { SubcategoryAddValidation } = require("../../validator/category");

//Get All Sub Category Route Started
Router.get("/", TokenVerifier, async (req, res) => {
  let subCategoris = await SubCategoris.aggregate([
    {
      $lookup: {
        from: "categoris",
        localField: "parent_category_id",
        foreignField: "_id",
        as: "parentCategories"
      }
    },
    {
      $project: {
        name: 1,
        iconUrl: 1,
        metaTitle: 1,

        author: {
          $arrayElemAt: ["$parentCategories", 0]
        }
      }
    }
  ]);
  res.json(subCategoris);
});

//Start Add Sub Category Route
Router.post("/add", TokenVerifier, async (req, res) => {
  // Lets Validate Submited Data And Call The Function
  const { error } = SubcategoryAddValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  //Lets Check If Category Exist
  const subcategoryExist = await SubCategoris.findOne({ name: req.body.name });
  if (subcategoryExist)
    return res.status(400).json({ message: "Sub Category Already Added" });

  //Create Slug
  const newSlog = slugify(req.body.name, { separator: "-" });

  //New Category Extensiate
  const subcategory = new SubCategoris({
    name: req.body.name,
    parent_category_id: req.body.parent_category_id,
    metaTitle: req.body.metaTitle,
    description: req.body.description,
    slug: newSlog
  });

  //Save Sub Category To Database
  subcategory
    .save()
    .then(res.json({ message: "Sub Category Added Successfully" }));
});

//Delete Sub  Category Route Started
Router.delete("/delete/:subcatid", TokenVerifier, async (req, res) => {
  //Check Catid Validity
  try {
    //Delete Category From Database By Catid
    const deleted = await SubCategoris.deleteOne({ _id: req.params.subcatid });
    res.json({ message: "Sub Catagory Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Sorry Something Went Wrong" });
  }
});

//Router Exported
module.exports = Router;
