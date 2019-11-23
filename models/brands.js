const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const brandsSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    logoUrl : {
        type : String,
        required : true,
    },
    metaTitle : {
        type: String,
        required : true,

    },
    description : {
        type: String,
        required : true,

    },
    slug : {
      type: String,  
    },
    date : {
        type : Date,
        default : Date.now
    }

});

module.exports = Brands = mongoose.model('brands', brandsSchema); 

