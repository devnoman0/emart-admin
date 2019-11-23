//Import Joi From Joi
const Joi = require("joi");

// Category Add Validation Schema
const categoryAddValidation = data => {
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

//Sub Category Add Validation Schema
const SubcategoryAddValidation = data => {
  // Validation Rules
  const schema = {
    name: Joi.string()
      .min(4)
      .required()
      .max(255),
    parent_category_id: Joi.string().required(),
    metaTitle: Joi.string().required(),
    description: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

//Sub Category Add Validation Schema
const SubSubcategoryAddValidation = data => {
  // Validation Rules
  const schema = {
    name: Joi.string()
      .min(4)
      .required()
      .max(255),
    parent_category_id: Joi.string().required(),
    sub_parent_category_id: Joi.string().required(),
    metaTitle: Joi.string().required(),
    description: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

// Export As module
module.exports.categoryAddValidation = categoryAddValidation;
module.exports.SubcategoryAddValidation = SubcategoryAddValidation;
module.exports.SubSubcategoryAddValidation = SubSubcategoryAddValidation;
