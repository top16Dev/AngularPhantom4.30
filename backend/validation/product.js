const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(data) {
  let errors = {};

  data.imagePath = !isEmpty(data.imagePath) ? data.imagePath : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.priceMain = !isEmpty(data.priceMain) ? data.priceMain : '';
  data.company = !isEmpty(data.company) ? data.company : '';

  if (!Validator.isLength(data.title, { min: 3, max: 60 })) {
    errors.title = 'Title needs to between 3 and 60 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Product title is required';
  }
  if (Validator.isEmpty(data.imagePath)) {
    errors.imagePath = 'Product image is required';
  }
  if (Validator.isEmpty(data.priceMain)) {
    errors.priceMain = 'Product main price is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Product company is required';
  }

  // if (!isEmpty(data.description)) {
  //     errors.description = 'Description is required , Not a valid description';
  // }
  // if (!isEmpty(data.priceNew)) {
  //     errors.priceNew = 'Not a valid Price New';
  // }
  // if (!isEmpty(data.discount)) {
  //     errors.discount = 'Not a valid discount number';
  // }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
