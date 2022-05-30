const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNotificationInput(data) {
  let errors = {};

  data.actionName = !isEmpty(data.actionName) ? data.actionName : '';
  data.action = !isEmpty(data.action) ? data.action : '';
  data.apiStatus = !isEmpty(data.apiStatus) ? data.apiStatus : '';
  data.apiID = !isEmpty(data.apiID) ? data.apiID : '';
  data.actionID = !isEmpty(data.actionID) ? data.actionID : '';

  if (Validator.isEmpty(data.actionName)) {
    errors.actionName = 'actionName of notification is required';
  }
  if (Validator.isEmpty(data.action)) {
    errors.action = 'action of notification is required';
  }
  if (Validator.isEmpty(data.apiStatus)) {
    errors.apiStatus = 'apiStatus of notification is required';
  }

  if (Validator.isEmpty(data.apiID)) {
    errors.apiID = 'apiID of notification is required';
  }

  if (Validator.isEmpty(data.actionID)) {
      errors.actionID = 'actionID is required';
  }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
