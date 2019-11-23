const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sellerCommissionSchema = new Schema({
    value : {
        type : String,
        required : true,
    },
   
});
module.exports = SellerCommission = mongoose.model('sellercommission', sellerCommissionSchema); 