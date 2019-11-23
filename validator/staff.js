//Import Joi From Joi
const Joi = require('joi')

// Staff Add Validation Schema
const addStaff = (data) => {

      // Validation Rules
      const schema = {
        name : Joi.string().min(4).required().max(255),
        email : Joi.string().email().required().min(6).max(255),
        password : Joi.string().required(),
        role : Joi.string().required(),
      }
      return Joi.validate(data, schema)
}

// Staff Roles Add Validation Schema
const addStaffRole = (data) => {

    // Validation Rules
    const schema = {
      name : Joi.string().min(4).required().max(255),
      permission: Joi.required()
    }
    return Joi.validate(data, schema)
}

// Export As module
module.exports.addStaff = addStaff;
module.exports.addStaffRole = addStaffRole;



