const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.imagePath = !isEmpty(data.imagePath) ? data.imagePath : '';
  data.priceMain = !isEmpty(data.priceMain) ? data.priceMain : '';
  data.priceNew = !isEmpty(data.priceNew) ? data.priceNew : '';
  data.slug = !isEmpty(data.slug) ? data.slug : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Product Accessories title field is required';
  }

  if (Validator.isEmpty(data.imagePath)) {
    errors.imagePath = 'Product Accessories image Path field is required';
  }

  if (Validator.isEmpty(data.priceNew)) {
    errors.priceNew = 'Product Accessories price New field is required';
  }
  if (Validator.isEmpty(data.priceMain)) {
    errors.priceMain = 'Product Accessories price Main field is required';
  }
  if (Validator.isEmpty(data.slug)) {
    errors.slug = 'Product slug field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};