const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const mongoose = require('mongoose');

// Load Profile Model
const Order = require('../../models/Order');
// Load Validation
const validateProductInput = require('../../validation/product');
const validateOrderInput = require('../../validation/order');
const validateNotificationInput = require('../../validation/notification');

// @route   GET api/order/test
// @desc    Tests order route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Order Works' }));

// @route   GET api/order/all
// @desc    Get all Orders
// @access  Public
router.get('/all', async (req, res) => {
    const errors = {};
    await Order.find()
      // fetch custome data
      //.populate('customerID', ['contactFirstName', 'contactLastName'])
      // Fetch all data
      .populate('customerID')
      .then(orders => {
        if (!orders) {
          errors.noorder = 'There are no Orders';
          return res.status(404).json(errors);
        }
        res.json(orders);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/order/ip/:ip
// @desc    Get Order by IP Address 
// @access  Public
router.get('/ip/:ip', async (req, res) => {
    const errors = {};
  
    await Order.find({ ipAddress: req.params.ip})
      .populate('customerID')
      .then(order => {
        if (!order) {
          errors.noorder = 'There is no order for this IP Address';
          res.status(404).json(errors);
        }
  
        res.json(order);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   GET api/order/quag/:qua
// @desc    Get Order by greater than or equal totalQuantity
// @access  Public
router.get('/quag/:qua', async (req, res) => {
    const errors = {};
    // {"lessons.release_time":{"$gte": ISODate("2012-12-16")}}
    await Order.find({ "totalQuantity": {"$gte": req.params.qua}})
      .populate('customerID')
      .then(order => {
        if (!order) {
          errors.noorder = 'There is no order for this IP Address';
          res.status(404).json(errors);
        }
  
        res.json(order);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   GET api/order/qual/:qua
// @desc    Get Order by less than or equal totalQuantity
// @access  Public
router.get('/qual/:qua', async (req, res) => {
    const errors = {};
    // {"lessons.release_time":{"$gte": ISODate("2012-12-16")}}
    await Order.find({ "totalQuantity": {"$lt": req.params.qua}})
      .populate('customerID')
      .then(order => {
        if (!order) {
          errors.noorder = 'There is no order for this IP Address';
          res.status(404).json(errors);
        }
  
        res.json(order);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/order/datel/:date
// @desc    Get Order by less than or equal createdTime
// @access  Public
router.get('/datel/:date', async (req, res) => {
    const errors = {};
    // {"lessons.release_time":{"$gte": ISODate("2012-12-16")}}
    await Order.find({ "createdTime": {"$lt": req.params.date}})
      .populate('customerID')
      .then(order => {
        if (!order) {
          errors.noorder = 'There is no order for this IP Address';
          res.status(404).json(errors);
        }
  
        res.json(order);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/order/dateg/:date
// @desc    Get Order by Greater than or equal createdTime
// @access  Public
router.get('/dateg/:date', async (req, res) => {
    const errors = {};
    // {"lessons.release_time":{"$gte": ISODate("2012-12-16")}}
    await Order.find({ "createdTime": {"$gte": req.params.date}})
      .populate('customerID')
      .then(order => {
        if (!order) {
          errors.noorder = 'There is no order for this IP Address';
          res.status(404).json(errors);
        }
  
        res.json(order);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/order/dateb/:dateg/:datel
// @desc    Get Order by Greater than and Less then createdTime
// @access  Public
router.get('/dateb/:dateg/:datel', async (req, res) => {
    const errors = {};
    // {"lessons.release_time":{"$gte": ISODate("2012-12-16")}}
    await Order.find({ "createdTime": {"$gte": req.params.dateg , "$lt": req.params.datel}})
      .populate('customerID')
      .then(order => {
        if (!order) {
          errors.noorder = 'There is no order for this IP Address';
          res.status(404).json(errors);
        }
  
        res.json(order);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   POST api/order
// @desc    Create or edit order
// @access  Private
router.post(
    '/',
    (req, res) => {
      const { errors, isValid } = validateOrderInput(req.body);
  
      // Check Validation
       if (!isValid) {
         // Return any errors with 400 status
         return res.status(400).json(errors);
       }
       var generateNumber = Math.random() * (999999999 - 10) + 10 ;
       console.log(generateNumber);
      // Get fields
      const orderFields = {};
      if (generateNumber) orderFields.orderSlug = generateNumber ;
      if (req.body.customerID) orderFields.customerID = req.body.customerID;
      if (req.body.totalQuantity) orderFields.totalQuantity = req.body.totalQuantity;
      if (req.body.ipAddress) orderFields.ipAddress = req.body.ipAddress;
      if (req.body.urlOrder) orderFields.urlOrder = req.body.urlOrder;
      if (req.body.installment) orderFields.installment = req.body.installment;
      if (req.body.paymentStatus) orderFields.paymentStatus = req.body.paymentStatus;
      if (req.body.processorStatus) orderFields.processorStatus = req.body.processorStatus;
      if (req.body.dueAmount) orderFields.dueAmount = req.body.dueAmount;
      if (req.body.paidAmount) orderFields.paidAmount = req.body.paidAmount;
      if (req.body.frontEndCurrency) orderFields.frontEndCurrency = req.body.frontEndCurrency;
      if (req.body.processedCurrency) orderFields.processedCurrency = req.body.processedCurrency;
      if (req.body.ccNumber) orderFields.ccNumber = req.body.ccNumber;
      if (req.body.paymentMethod) orderFields.paymentMethod = req.body.paymentMethod;
      if (req.body.processorMethod) orderFields.processorMethod = req.body.processorMethod;

    //   order.findOne({ slug: req.body.slug , company: req.body.company}).then(order => {
    //     if (order) {
    //       // Update
    //       Order.findOneAndUpdate(
    //         { slug: req.body.slug },
    //         { $set: orderFields },
    //         { new: true }
    //       ).then(order => res.json(order));
  
    //     } else {
    //       // Create
  
    //       // Check if slug exists with Company
    //       Order.findOne({ slug: orderFields.slug , company: orderFields.company}).then(order => {
    //         if (order) {
    //           errors.slug = 'That title already exists with this Comapny';
    //           res.status(400).json(errors);
    //         }
    //         else {
    //           // Save order
    //           new Order(orderFields).save().then(order => res.json(order));
    //         }
    //       });
    //     }

    //   });
     
      // Save Order
      new Order(orderFields).save().then(order => res.json(order));

    }
  );

// @route   POST api/order/productdetails
// @desc    Add productdetails to order 
// @access  private
router.post(
  '/productdetails',
  async (req, res) => {
    // const { errors, isValid } = validateQuantityInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }

    await Order.findOne({ orderSlug: req.body.orderSlug }).then(order => {
      const newType = {
        productID: req.body.productID,
        Quantity: req.body.Quantity,
        total: req.body.total
      };
      // Add to typeQuantity array
      order.order.productdetails.unshift(newType);

      order.save().then(order => res.json(order));
    });
  }
);

// @route   POST api/order/notification
// @desc    Add notification to order 
// @access  private
router.post(
  '/notification',
  async (req, res) => {
    const { errors, isValid } = validateNotificationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    await Order.findOne({ orderSlug: req.body.orderSlug }).then(order => {
      const newNotification = {
        actionName: req.body.actionName,
        action: req.body.action,
        webhookTimeStamp: req.body.webhookTimeStamp,
        apiStatus: req.body.apiStatus,
        apiID: req.body.apiID,
        actionID: req.body.actionID
      };
      // Add to typeQuantity array
      order.order.notification.unshift(newNotification);

      order.save().then(order => res.json(order));
    });
  }
);
module.exports = router;