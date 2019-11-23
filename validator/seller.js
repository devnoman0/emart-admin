//Import Joi From Joi
const Joi = require('joi')

// Category Add Validation Schema
const addSeller = (data) => {

      // Validation Rules
      const schema = {
        name : Joi.string().min(4).required().max(255),
        email : Joi.string().email().required().min(6).max(255),
        password : Joi.string().required(),
      }
      return Joi.validate(data, schema)
}

// Seller Commission Add Validation Schema
const addSellerCommission = (data) => {

    // Validation Rules
    const schema = {
      value : Joi.string().required()
    }
    return Joi.validate(data, schema)
}


// Export As module
module.exports.addSeller = addSeller;
module.exports.addSellerCommission = addSellerCommission;


