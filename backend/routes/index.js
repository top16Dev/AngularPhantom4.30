var express = require('express');
var router = express.Router();
// Load Profile Model
const Product = require('../models/Product');

// Load Validation
const validateProductInput = require('../validation/product');
const validateQuantityInput = require('../validation/quantity');
const validateAccessoriesInput = require('../validation/accessories');


// @route   GET api/product/all
// @desc    Get all products
// @access  Public
router.get('/', async  (req, res) => {
 
  Product.findOne({availability: true})
  .then(product => {
    res.render('Order/order',{
      product: product
    });
    console.log(product);
  })
//   var myPromise = () => {
//     return new Promise((resolve, reject) => {
     
//       Product.find({availability: true})
//        .limit(1)
//        .toArray(function(err, data) {
//           err 
//              ? reject(err) 
//              : resolve(data[0]);
//         });
//     });
//  };
// //await myPromise
// var product = await myPromise();
// //continue execution
// client.close();
// res.render('Order/order',{
//   product: product
// });
//res.json(result);

});
// @route   GET api/product/all
// @desc    Test Get all products
// @access  Public
router.get('/product/all', (req, res) => {
 
  Product.findOne({availability: true})
  .then(product => {
    res.render('Order/order',{
      product: product
    });
    console.log(product);
  })
});

module.exports = router;
