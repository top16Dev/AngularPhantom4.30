const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const mongoose = require('mongoose');

// Load Profile Model
const Country = require('../../models/Country');
// Load Validation
//const validateProductInput = require('../../validation/product');
//const validateQuantityInput = require('../../validation/quantity');
//const validateAccessoriesInput = require('../../validation/accessories');

// @route   GET api/country/test
// @desc    Tests country route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Country Works' }));

// @route   GET api/country/all
// @desc    Get all countries
// @access  Public
router.get('/all', async (req, res) => {
    const errors = {};
   await Country.find()
    .sort({"name": 1})
      .then(countries => {
        if (!countries) {
          errors.noproduct = 'There are no Countries';
          return res.status(404).json(errors);
        }
        res.json(countries);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   GET api/country/:ProcessorCurrency
// @desc    Get country by ProcessorCurrency 
// @access  Public

router.get('/:ProcessorCurrency', async (req, res) => {
    const errors = {};
  
    await Country.find({ ProcessorCurrency: req.params.ProcessorCurrency})
      // .populate('user', ['name', 'avatar'])
      //.project({ name: 1, ProcessorCurrency: 1 })
      .select({ name: 1, ProcessorCurrency: 1, frontEndCurrency:1 })
      .then(country => {
        if (!country) {
          errors.nocountry = 'There is no country for this ProcessorCurrency';
          res.status(404).json(errors);
        }
        res.json(country);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   GET api/country/:name
// @desc    Get country by name 
// @access  Public

router.get('/:name', (req, res) => {
  const errors = {};

  Country.findOne({ name: req.params.name})
    // .populate('user', ['name', 'avatar'])
    .then(country => {
      if (!country) {
        errors.nocountry = 'There is no country for this name';
        res.status(404).json(errors);
      }
      res.json(country);
    })
    .catch(err => res.status(404).json(err));
});
// @route   POST api/country
// @desc    Create or edit country
// @access  Private
router.post(
    '/',
    async (req, res) => {
    //   const { errors, isValid } = validateProductInput(req.body);
  
    //   // Check Validation
    //    if (!isValid) {
    //      // Return any errors with 400 status
    //      return res.status(400).json(errors);
    //    }

      // Get fields
      const countryFields = {};
      if (req.body.name) countryFields.name = req.body.name;
      if (req.body.IOS) countryFields.IOS = req.body.IOS;
      if (req.body.IOS) countryFields.flagImage = req.body.flagImage;
      if (req.body.frontEndCurrency) countryFields.frontEndCurrency = req.body.frontEndCurrency;
      if (req.body.ProcessorCurrency) countryFields.ProcessorCurrency = req.body.ProcessorCurrency ;
      if (req.body.googletranslatelanguage) countryFields.googletranslatelanguage = req.body.googletranslatelanguage;
      
      await Country.findOne({ name: req.body.name}).then(country => {
        if (country) {
          // Update
          Country.findOneAndUpdate(
            { name: req.body.name },
            { $set: countryFields },
            { new: true }
          ).then(country => res.json(country));
  
        } else {
          // Create
          // Check if slug exists with Company
          Country.findOne({ name: countryFields.name}).then(country => {
            if (country) {
              errors.slug = 'That title already exists with this Country';
              res.status(400).json(errors);
            }
            else {
              // Save Country
              new Country(countryFields).save().then(country => res.json(country));
            }
          });
        }

      });
     
    }
  );
  
// @route   POST api/country/state
// @desc    Add state to country 
// @access  Private
router.post(
    '/state',
    async (req, res) => {
      //const { errors, isValid } = validateAccessoriesInput(req.body);
  
      // Check Validation
      //if (!isValid) {
        // Return any errors with 400 status
     //   return res.status(400).json(errors);
      //}
      await Country.findOne({ name: req.body.name }).then(country => {
        const newState = {
          name: req.body.namestate
        };
        // Add to state array
        country.state.unshift(newState);
        country.save().then(country => res.json(country));
      });
    }
  );
  // @route   POST api/country/state
// @desc    Add state to country 
// @access  Private
router.post(
  '/state2',
  async (req, res) => {
    //const { errors, isValid } = validateAccessoriesInput(req.body);

    // Check Validation
    //if (!isValid) {
      // Return any errors with 400 status
   //   return res.status(400).json(errors);
    //}
    
    await Country.findOne({ name: req.body.name }).then(country => {
      const newState =[ {
        //name: req.body.namestate
        name: 'Bale'
      },
      { name: 'Bam'}];

      // Add to state array
      country.state.unshift(newState);
      country.save().then(country => res.json(country));
    });
  }
);
  module.exports = router;
  