const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const staffRoleSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    permission : {
        type : Array,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }

});


module.exports = StaffRole = mongoose.model('staffsrole', staffRoleSchema); 


