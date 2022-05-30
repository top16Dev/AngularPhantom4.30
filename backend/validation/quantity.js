const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.numberOfFree = !isEmpty(data.numberOfFree) ? data.numberOfFree : '';
  data.eachPrice = !isEmpty(data.eachPrice) ? data.eachPrice : '';
  data.NumberOfBuy = !isEmpty(data.NumberOfBuy) ? data.NumberOfBuy : '';
  data.saveMoney = !isEmpty(data.saveMoney) ? data.saveMoney : '';
  data.slug = !isEmpty(data.slug) ? data.slug : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Product Type of Quantity title field is required';
  }

  if (Validator.isEmpty(data.numberOfFree)) {
    errors.numberOfFree = 'Product Type of Quantity Number Of Free  field is required';
  }

  if (Validator.isEmpty(data.eachPrice)) {
    errors.eachPrice = 'Product Type of Quantity each Price field is required';
  }
  if (Validator.isEmpty(data.NumberOfBuy)) {
    errors.NumberOfBuy = 'Product Type of Quantity Number Of Buy field is required';
  }
  // if (Validator.isEmpty(data.saveMoney)) {
  //   errors.saveMoney = 'Product Type of Quantity Save Money field is required';
  // }
  if (Validator.isEmpty(data.slug)) {
    errors.slug = 'Product slug field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};