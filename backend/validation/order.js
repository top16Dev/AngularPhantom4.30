const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrderInput(data) {
  let errors = {};

  data.customerID = !isEmpty(data.customerID) ? data.customerID : '';
  data.totalQuantity = !isEmpty(data.totalQuantity) ? data.totalQuantity : '';
  data.ipAddress = !isEmpty(data.ipAddress) ? data.ipAddress : '';
  data.urlOrder = !isEmpty(data.urlOrder) ? data.urlOrder : '';
  data.processorStatus = !isEmpty(data.processorStatus) ? data.processorStatus : '';
  data.dueAmount = !isEmpty(data.dueAmount) ? data.dueAmount : '';
  data.paidAmount = !isEmpty(data.paidAmount) ? data.paidAmount : '';
  data.paymentMethod = !isEmpty(data.paymentMethod) ? data.paymentMethod : '';
  data.frontEndCurrency = !isEmpty(data.frontEndCurrency) ? data.frontEndCurrency : '';
  data.processedCurrency = !isEmpty(data.processedCurrency) ? data.processedCurrency : '';
  data.ccNumber = !isEmpty(data.ccNumber) ? data.ccNumber : '';


    if (Validator.isEmpty(data.customerID)) {
        errors.customerID = 'customerID of order is required';
    }
    if (Validator.isEmpty(data.totalQuantity)) {
        errors.totalQuantity = 'totalQuantity of order is required';
    }
    if (Validator.isEmpty(data.ipAddress)) {
        errors.ipAddress = 'ipAddress of User for order is required';
    }

    if (Validator.isEmpty(data.urlOrder)) {
        errors.urlOrder = 'url Order of page is required';
    }
    if (Validator.isEmpty(data.processorStatus)) {
        errors.processorStatus = 'processor Status of page is required';
    }
    if (Validator.isEmpty(data.paymentStatus)) {
        errors.paymentStatus = 'paymentStatus of order is required';
    }

    if (Validator.isEmpty(data.dueAmount)) {
        errors.dueAmount = 'due Amount of order is required';
    }
    if (Validator.isEmpty(data.paidAmount)) {
        errors.paidAmount = 'paid Amount of order is required';
    }
    if (Validator.isEmpty(data.paymentMethod)) {
        errors.paymentMethod = 'payment Method of order is required';
    }
    if (Validator.isEmpty(data.frontEndCurrency)) {
        errors.frontEndCurrency = 'frontEnd Currency Method of order is required';
    }
    if (Validator.isEmpty(data.processedCurrency)) {
        errors.processedCurrency = 'processed Currency of order is required';
    }
    if (Validator.isEmpty(data.ccNumber)) {
        errors.ccNumber = 'cc Number of order is required';
    }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
