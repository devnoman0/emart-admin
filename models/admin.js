const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    name : {
        type : String,
        required : true,
        min : 6,
    },
    email : {
        type : String,
        min : 6,
        max : 255,
        required : true,
    },
    username : {
        type : String,
        min : 4,
        max : 255,
        required : true,

    },
    password : {
        type: String,
        min : 6,
        required : true,

    },
    date : {
        type : Date,
        default : Date.now
    }

});

module.exports = Admins = mongoose.model('admins', adminSchema); 

