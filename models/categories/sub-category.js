const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubcategorySchema = new Schema({
  name: {
    type: String
  },
  parent_category_id: {
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

module.exports = SubCategoris = mongoose.model(
  "subcategoris",
  SubcategorySchema
);
