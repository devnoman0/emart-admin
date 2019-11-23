const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  iconUrl: {
    type: String,
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

module.exports = Categoris = mongoose.model("categoris", categorySchema);
