const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Create Product Schema
const ProductSchema = new Schema({
    imagePath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        max: 60
    },
    slug: {
        type: String,
        trim: true,
        lowercase:true
    },
    description: {
        type: String
    },
    priceMain: {
        type: Number,
        required: true
    },
    priceNew: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    company: {
        type: String,
        required: true
    },
    specialOffer: {
        type: Boolean,
        default: false
    },
    availability: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // we have lot of option buy for product
    // for example Buy 3 DroneX Pro , Get 2 Free ($ 1,639/each) total = 8,195 and you only pay  $ 4917 as well as you can save 3278
    // title = for example Buy 3 DroneX Pro  , numberOfFree = 2 , eachPrice = 1639 , NumberOfBuy = 5 , 
    typeQuantity: [
        {
            title: {
                type: String,
                required: true
            },
            numberOfFree: {
                type: Number,
                required: true
            },
            eachPrice: {
                type: Number,
                required: true
            },
            NumberOfBuy: {
                type: Number,
                required: true
            },
            saveMoney: {
                type: Number,
                required: true
            },
            dueAmount: {
                type: Number,
                required: true
            },
            totalAmount: {
                type: Number,
                required: true
            },
            bestSeller: {
                type: Boolean,
                default: false
            },
            freeFrontEnd: {
                type: Boolean,
                default: false
            },
            sortFrontEnd: {
                type: Number,
                required: true
            }
        }
    ],
    accessories: [
        {
            title: {
                type: String,
                required: true
            },
            imagePath: {
                type: String,
                required: true
            },
            priceMain: {
                type: Number,
                required: true
            },
            priceNew: {
                type: Number,
                default: 0
            },
            mostPopular: {
                type: Boolean,
                default: false
            },
            specialOffer: {
                type: Boolean,
                default: false
            }
        }
    ]
  });
  
  module.exports = Product = mongoose.model('product', ProductSchema);