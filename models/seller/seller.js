const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const sellerSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type: String,
        required : true,

    },
    isVarified : {
        type : Boolean,
       default : false 
    },
    date : {
        type : Date,
        default : Date.now
    }

});


module.exports = Seller = mongoose.model('seller', sellerSchema); 


