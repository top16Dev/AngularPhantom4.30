const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Profile Model
const Customer = require('../../models/Customer');
// Load Validation
const validateProductInput = require('../../validation/product');
const validateQuantityInput = require('../../validation/quantity');
const validateAccessoriesInput = require('../../validation/accessories');

// @route   GET api/customer/test
// @desc    Tests customer route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Customer Works' }));



// @route   GET api/customer/all
// @desc    Get all customers
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
    Customer.find()
      .then(customers => {
        if (!customers) {
          errors.noproduct = 'There are no Customers';
          return res.status(404).json(errors);
        }
        res.json(customers);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   GET api/customer/slug/:slug
// @desc    Get customer by slug 
// @access  Public

router.get('/slug/:slug', (req, res) => {
  const errors = {};

  Customer.findOne({ customerSlug: req.params.slug})
    // .populate('user', ['name', 'avatar'])
    .then(customer => {
      if (!customer) {
        errors.nocustomer = 'There is no customer for this slug';
        res.status(404).json(errors);
      }

      res.json(customer);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/customer/email/:email
// @desc    Get customer by Email 
// @access  Public

router.get('/email/:email', (req, res) => {
    const errors = {};
  
    Customer.findOne({ email: req.params.email})
      // .populate('user', ['name', 'avatar'])
      .then(customer => {
        if (!customer) {
          errors.nocustomer = 'There is no customer for this Email';
          res.status(404).json(errors);
        }
  
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   GET api/customer/emails/:email
// @desc    Get customer by Email 
// @access  Public
router.get('/emails/:email', (req, res) => {
    const errors = {};
  
    Customer.find({ email: req.params.email})
      // .populate('user', ['name', 'avatar'])
      .then(customer => {
        if (!customer) {
          errors.nocustomer = 'There is no customer for this Email';
          res.status(404).json(errors);
        }
  
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/customer/lan/:lan
// @desc    Get customer by language 
// @access  Public
router.get('/lan/:lan', (req, res) => {
    const errors = {};
  
    Customer.find({ language: req.params.lan})
      // .populate('user', ['name', 'avatar'])
      .then(customer => {
        if (!customer) {
          errors.nocustomer = 'There is no customer for this language';
          res.status(404).json(errors);
        }
  
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/customer/ip/:ip
// @desc    Get customer by IP 
// @access  Public
router.get('/ip/:ip', (req, res) => {
    const errors = {};
  
    Customer.find({ ipAddress: req.params.ip})
      // .populate('user', ['name', 'avatar'])
      .then(customer => {
        if (!customer) {
          errors.nocustomer = 'There is no customer for this IP Address';
          res.status(404).json(errors);
        }
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   GET api/customer/phone/:phone
// @desc    Get customer by Phone 
// @access  Public
router.get('/phone/:phone', (req, res) => {
    const errors = {};
    // {"chapters.tests":{"$elemMatch":{"name":"ScienceChap1Test1"}}}
    // {"chapters":{"$elemMatch":{"name":"ScienceChap1"}}}
    Customer.find({"addressdetail":{"$elemMatch":{"phone":req.params.phone}}})
      // .populate('user', ['name', 'avatar'])
      .then(customer => {
        if (!customer) {
          errors.nocustomer = 'There is no customer for this Phone';
          res.status(404).json(errors);
        }
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   GET api/customer/country/:country
// @desc    Get customer by Country 
// @access  Public
router.get('/country/:country', (req, res) => {
    const errors = {};
    // {"chapters.tests":{"$elemMatch":{"name":"ScienceChap1Test1"}}}
    // {"chapters":{"$elemMatch":{"name":"ScienceChap1"}}}
    Customer.find({"addressdetail":{"$elemMatch":{"country":req.params.country}}})
      // .populate('user', ['name', 'avatar'])
      .then(customer => {
        if (!customer) {
          errors.nocustomer = 'There is no customer for this Country';
          res.status(404).json(errors);
        }
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/customer/city/:city
// @desc    Get customer by City 
// @access  Public
router.get('/city/:city', (req, res) => {
    const errors = {};
    // {"chapters.tests":{"$elemMatch":{"name":"ScienceChap1Test1"}}}
    // {"chapters":{"$elemMatch":{"name":"ScienceChap1"}}}
    Customer.find({"addressdetail":{"$elemMatch":{"city":req.params.city}}})
      // .populate('user', ['name', 'avatar'])
      .then(customer => {
        if (!customer) {
          errors.nocustomer = 'There is no customer for this City';
          res.status(404).json(errors);
        }
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/customer/state/:state
// @desc    Get customer by State 
// @access  Public
router.get('/state/:state', (req, res) => {
    const errors = {};
    // {"chapters.tests":{"$elemMatch":{"name":"ScienceChap1Test1"}}}
    // {"chapters":{"$elemMatch":{"name":"ScienceChap1"}}}
    Customer.find({"addressdetail":{"$elemMatch":{"state":req.params.state}}})
      // .populate('user', ['name', 'avatar'])
      .then(customer => {
        if (!customer) {
          errors.nocustomer = 'There is no customer for this State';
          res.status(404).json(errors);
        }
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   GET api/customer/zip/:zip
// @desc    Get customer by zipCode 
// @access  Public
router.get('/zip/:zip', (req, res) => {
    const errors = {};
    // {"chapters.tests":{"$elemMatch":{"name":"ScienceChap1Test1"}}}
    // {"chapters":{"$elemMatch":{"name":"ScienceChap1"}}}
    Customer.find({"addressdetail":{"$elemMatch":{"zipCode":req.params.zip}}})
      // .populate('user', ['name', 'avatar'])
      .then(customer => {
        if (!customer) {
          errors.nocustomer = 'There is no customer for this Zip Code';
          res.status(404).json(errors);
        }
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  });
// @route   POST api/customer
// @desc    Create or edit customer
// @access  Private
router.post(
    '/',
    (req, res) => {
    //   const { errors, isValid } = validateProductInput(req.body);
  
    //   // Check Validation
    //    if (!isValid) {
    //      // Return any errors with 400 status
    //      return res.status(400).json(errors);
    //    }
       var generateNumber = Math.random() * (999999999 - 10) + 10 + "." + req.body.email ;
      
      // Get fields
      const customerFields = {};
      if (req.body.email) customerFields.customerSlug = generateNumber ;
      if (req.body.contactFirstName) customerFields.contactFirstName = req.body.contactFirstName;
      if (req.body.contactLastName) customerFields.contactLastName = req.body.contactLastName;
      if (req.body.email) customerFields.email = req.body.email;
      if (req.body.phone) customerFields.phone = req.body.phone ;
      if (req.body.language) customerFields.language = req.body.language;
      if (req.body.ipAddress) customerFields.ipAddress = req.body.ipAddress;
      
      Customer.findOne({ customerSlug: req.body.customerSlug}).then(customer => {
        if (customer) {
          // Update
          Customer.findOneAndUpdate(
            { customerSlug: req.body.customerSlug },
            { $set: customerFields },
            { new: true }
          ).then(customer => res.json(customer));
  
        } else {
          // Create
          // Check if slug exists with Company
          Customer.findOne({ customerSlug: customerFields.customerSlug}).then(customer => {
            if (customer) {
              errors.slug = 'That title already exists with this Customer';
              res.status(400).json(errors);
            }
            else {
              // Save Customer
              new Customer(customerFields).save().then(customer => res.json(customer));
            }
          });
        }

      });
     
    }
  );
// @route   POST api/customer/address
// @desc    Add productdetails to Customer 
// @access  Public
router.post(
  '/address',
  (req, res) => {
    // const { errors, isValid } = validateQuantityInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
    Customer.findOne({ customerSlug: req.body.customerSlug }).then(customer => {
      const newAddress = {
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
        street: req.body.street,
        zipCode: req.body.zipCode
      };
      // Add to typeQuantity array
      customer.addressdetail.unshift(newAddress);
      customer.save().then(customer => res.json(customer));
    });
  }
);
// @route   DELETE api/customer/address/:add
// @desc    Delete customer from customer
// @access  Private
router.delete(
    '/address/:add_id',
    (req, res) => {
        Customer.findOne({ customerSlug: req.body.customerSlug })
        .then(customer => {
          // Get remove index
          const removeIndex = customer.addressdetail
            .map(item => item.id)
            .indexOf(req.params.add_id);
  
          // Splice out of array
          customer.addressdetail.splice(removeIndex, 1);
  
          // Save
          customer.save().then(customer => res.json(customer));
        })
        .catch(err => res.status(404).json(err));
    }
  );
// @route   DELETE api/customer
// @desc    Delete customer by slug
// @access  Private
router.delete(
    '/', (req, res) => {
        Customer.findOneAndDelete({ customerSlug: req.body.customerSlug }).then(() => {
        res.json({ success: true })
      });
    }
  );

module.exports = router;