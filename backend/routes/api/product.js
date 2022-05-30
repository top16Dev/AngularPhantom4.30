const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const mongoose = require('mongoose');

// Load Profile Model
const Product = require('../../models/Product');
// Load Validation
const validateProductInput = require('../../validation/product');
const validateQuantityInput = require('../../validation/quantity');
const validateAccessoriesInput = require('../../validation/accessories');


// @route   GET api/product/test
// @desc    Tests product route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Products Works' }));


// @route   GET api/product/all
// @desc    Get all products
// @access  Public
router.get('/all', async (req, res) => {
    const errors = {};
    await Product.find()
      .then(products => {
        if (!products) {
          errors.noproduct = 'There are no Products';
          return res.status(404).json(errors);
        }
        res.json(products);
      })
      .catch(err => res.status(404).json(err));
  });


// @route   GET api/product/:slug
// @desc    Get product by slug and availability is "true"
// @access  Public

router.get('/:slug', async (req, res) => {
  const errors = {};

  await Product.findOne({ slug: req.params.slug ,availability: "true"})
    // .populate('user', ['name', 'avatar'])
    .then(product => {
      if (!product) {
        errors.noproduct = 'There is no Product for this slug';
        res.status(404).json(errors);
      }
      //res.render('Order/order');
      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/product/company/:company
// @desc    Get product by Company
// @access  Public

router.get('/company/:company', async (req, res) => {
  const errors = {};
  await Product.find({ company: req.params.company })
    // .populate('user', ['name', 'avatar'])
    .then(product => {
      if (!product) {
        errors.noproduct = 'There is no Product for this Company';
        res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/product/specialOffer/:slug
// @desc    Get one product by specialOffer and slug
// @access  Public

router.get('/specialOffer/:slug', async (req, res) => {
  const errors = {};
  await Product.findOne({ specialOffer: "true" ,slug: req.params.slug})
    // .populate('user', ['name', 'avatar'])
    .then(product => {
      if (!product) {
        errors.noproduct = 'There is no Product for this specialOffer and slug';
        res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/product/specialOffers/:company
// @desc    Get all products by specialOffer is true and Company
// @access  Public

router.get('/specialOffers/:company', async (req, res) => {
  const errors = {};

  await Product.find({ specialOffer: "true" , company: req.params.company })
    // .populate('user', ['name', 'avatar'])
    .then(product => {
      if (!product) {
        errors.noproduct = 'There is no Product for this specialOffer and Company';
        res.status(404).json(errors);
      }

      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/product/availability/:company
// @desc    Get one product by availability and Company
// @access  Public

router.get('/availability/:company', async (req, res) => {
  const errors = {};

  await Product.findOne({ availability: "true" ,company: req.params.company})
    // .populate('user', ['name', 'avatar'])
    .then(product => {
      if (!product) {
        errors.noproduct = 'There is no Product for this availability and Company';
        res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/product/availabilities/:company
// @desc    Get all products by availabilities and Company
// @access  Public

router.get('/avalabilits/:company', async (req, res) => {
  const errors = {};

  await Product.find({ availability: "true" , company: req.params.company })
    // .populate('user', ['name', 'avatar'])
    .then(product => {
      if (!product) {
        errors.noproduct = 'There is no Product for this availabilities and Company';
        res.status(404).json(errors);
      }

      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/product
// @desc    Create or edit product
// @access  Private
router.post(
  '/',
  async (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    // Check Validation
     if (!isValid) {
       // Return any errors with 400 status
       return res.status(400).json(errors);
     }

    // Get fields
    const productFields = {};
    if (req.body.imagePath) productFields.imagePath = req.body.imagePath;
    if (req.body.title) productFields.title = req.body.title;
    if (req.body.company) productFields.company = req.body.company;
    if (req.body.title) productFields.slug = req.body.title + "." + req.body.company;
    if (req.body.description) productFields.description = req.body.description;
    if (req.body.priceMain) productFields.priceMain = req.body.priceMain;
    if (req.body.priceNew) productFields.priceNew = req.body.priceNew;
    if (req.body.discount) productFields.discount = req.body.discount;
    if (req.body.specialOffer) productFields.specialOffer = req.body.specialOffer;
    if (req.body.avalability) productFields.avalability = req.body.avalability;
    if (req.body.date) productFields.date = req.body.date;
    
    await Product.findOne({ slug: req.body.slug , company: req.body.company}).then(product => {
      if (product) {
        // Update
        Product.findOneAndUpdate(
          { slug: req.body.slug },
          { $set: productFields },
          { new: true }
        ).then(product => res.json(product));

      } else {
        // Create

        // Check if slug exists with Company
        Product.findOne({ slug: productFields.slug , company: productFields.company}).then(product => {
          if (product) {
            errors.slug = 'That title already exists with this Comapny';
            res.status(400).json(errors);
          }
          else {
            // Save Product
            new Product(productFields).save().then(product => res.json(product));
          }
        });
      }
    });
  }
);

// @route   POST api/product/quantity
// @desc    Add type Quantity to Product for example Buy 3 DroneX Pro , Get 2 Free ($ 1,639/each) total = 8,195 and you only pay  $ 4917 as well as you can save 3278
// @access  Private
router.post(
  '/quantity',
  async (req, res) => {
    const { errors, isValid } = validateQuantityInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    var str_saveMoney,str_dueAmount,str_totalAmount = 0;
    if (req.body.numberOfFree <= 0){
      str_saveMoney = 0 ;
      str_dueAmount = (req.body.NumberOfBuy * req.body.eachPrice);
      str_totalAmount = req.body.NumberOfBuy * req.body.eachPrice;
    }else
    {
      str_saveMoney = req.body.eachPrice * req.body.numberOfFree ;
      str_dueAmount = ((req.body.NumberOfBuy - req.body.numberOfFree) * req.body.eachPrice);
      str_totalAmount = req.body.NumberOfBuy * req.body.eachPrice;      
    }
    await Product.findOne({ slug: req.body.slug }).then(product => {
      const newType = {
        title: req.body.title,
        numberOfFree: req.body.numberOfFree,
        eachPrice: req.body.eachPrice,
        NumberOfBuy: req.body.NumberOfBuy,
        saveMoney: str_saveMoney,
        dueAmount: str_dueAmount,
        totalAmount: str_totalAmount,
        bestSeller: req.body.bestSeller,
        sortFrontEnd : req.body.sortFrontEnd,
        freeFrontEnd : req.body.freeFrontEnd
      };
      // Add to typeQuantity array
      product.typeQuantity.unshift(newType);

      product.save().then(product => res.json(product));
    });
  }
);

// @route   POST api/product/accessory
// @desc    Add accessory to Product for example 720P High Resolution Camera price Main = 35 , price New = 25 Number Of Buy = 3
// @access  Private
router.post(
  '/accessory',
  async (req, res) => {
    const { errors, isValid } = validateAccessoriesInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    await Product.findOne({ slug: req.body.slug }).then(product => {
      const newAccessories = {
        title: req.body.title,
        imagePath: req.body.imagePath,
        priceMain: req.body.priceMain,
        mostPopular: req.body.mostPopular,
        specialOffer: req.body.specialOffer,
        priceNew: req.body.priceNew
      };
      // Add to accessories array
      product.accessories.unshift(newAccessories);
      product.save().then(product => res.json(product));
    });
  }
);

// @route   DELETE api/product/quantity/:qua_id
// @desc    Delete quantity from product
// @access  Private
router.delete(
  '/quantity/:qua_id',
  async (req, res) => {
    await Product.findOne({ slug: req.body.slug })
      .then(product => {
        // Get remove index
        const removeIndex = product.typeQuantity
          .map(item => item.id)
          .indexOf(req.params.qua_id);

        // Splice out of array
        product.typeQuantity.splice(removeIndex, 1);

        // Save
        product.save().then(product => res.json(product));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/product/accessory/:acc_id
// @desc    Delete accessory from product
// @access  Private
router.delete(
  '/accessory/:acc_id',
  async (req, res) => {
    await Product.findOne({ slug: req.body.slug })
      .then(product => {
        // Get remove index
        const removeIndex = product.accessories
          .map(item => item.id)
          .indexOf(req.params.acc_id);

        // Splice out of array
        product.accessories.splice(removeIndex, 1);

        // Save
        product.save().then(product => res.json(product));
      })
      .catch(err => res.status(404).json(err));
  }
);
// @route   DELETE api/product
// @desc    Delete product by slug
// @access  Private
router.delete(
  '/', async (req, res) => {
    await Product.findOneAndDelete({ slug: req.body.slug }).then(() => {
      res.json({ success: true })
    });
  }
);
  module.exports = router;