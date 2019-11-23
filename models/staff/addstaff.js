const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const staffSchema = new Schema({
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
    role : {
        type : String,
        required : true
       
    },
    date : {
        type : Date,
        default : Date.now
    }

});


module.exports = Staff = mongoose.model('staffs', staffSchema); 


