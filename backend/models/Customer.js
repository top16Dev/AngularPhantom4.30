const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Create Product Schema
const CustomerSchema = new Schema({
    customerSlug: {
        type: String
    },
    contactFirstName: {
        type: String,
        required: true
    },
    contactLastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    language: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    addressdetail: [
        {
            country: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            street: {
                type: String,
                default: 0
            },
            zipCode: {
                type: Number,
                default: 0
            }
        }
    ]
 });
    module.exports = Customer = mongoose.model('customer', CustomerSchema);