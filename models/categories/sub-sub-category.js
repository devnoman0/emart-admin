const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubSubcategorySchema = new Schema({
  name: {
    type: String
  },
  parent_category_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  sub_parent_category_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  metaTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = SubSubCategoris = mongoose.model(
  "subsubcategoris",
  SubSubcategorySchema
);
