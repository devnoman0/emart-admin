//Import Joi From Joi
const Joi = require("joi");

// Category Add Validation Schema
const addBrands = data => {
  // Validation Rules
  const schema = {
    name: Joi.string()
      .required()
      .error(() => {
        return {
          message: {
            nameError: "Name can not be empty"
          }
        };
      }),
    metaTitle: Joi.string()
      .required()
      .error(() => {
        return {
          message: {
            metaTitleError: "Meta title can not be empty"
          }
        };
      }),
    description: Joi.string()
      .required()
      .error(() => {
        return {
          message: {
            descriptionError: "metaTitle can not be empty"
          }
        };
      })
  };
  return Joi.validate(data, schema);
};

// Export As module
module.exports.addBrands = addBrands;
