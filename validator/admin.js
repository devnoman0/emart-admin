//Import Joi From Joi
const Joi = require('joi')

// Admin Add Validation Schema
const adminAddValidation = (data) => {

      // Admin Add Validation
      const schema = {
        name : Joi.string().min(4).required().max(255),
        email : Joi.string().email().required().min(6).max(255),
        username : Joi.string().min(4).required().max(255),
        password : Joi.string().min(6).required()
      }
      return Joi.validate(data, schema)
}

//Admin Login Validation
const adminLoginValidation = (data) => {

  // Admin Add Validation
  const schema = {
    email : Joi.string().email().min(4).required().max(255).error(() => {
      return {
        message: {
          emailError : "Email Must Be Valid"
        },
      };
    }),
    password : Joi.string().min(6).required().error(() => {
      return {
        message: {
          passwordError : "Minimum Required 6 Charecters"
        },
      };
    }),
  }
  return Joi.validate(data, schema)
}


module.exports.adminAddValidation = adminAddValidation;
module.exports.adminLoginValidation = adminLoginValidation;
