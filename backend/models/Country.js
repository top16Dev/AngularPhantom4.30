const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountriesSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    IOS: {
        type: String,
        required: true
    },
    frontEndCurrency: {
        type: String,
        required: true
    },
    ProcessorCurrency: {
        type: String,
        required: true
    },
    flagImage: {
        type: String,
        required: true
    },
    googletranslatelanguage: {
        type: String,
        default: 'en'
    },
    processors: [
        {
            // PayPal , Twocheckout , GateTwoPayments, Billpro , PrimeiroPay , BlueSnap , SafeCharge, Pbs , Duspay , PrimeiroPay(MXN)
            name: {
                type: String,
                required: true
            },
            // PayPal or Credit Card
            gateway: {
                type: String,
                required: true
            },
            // Rotation 100,99,...
            weigh: {
                type: String,
                required: true
            }
        }
    ],
    state: [
        {
            name: {
                type: String,
                required: true
            }
        }
    ]
});
  
module.exports = Countries = mongoose.model('countries', CountriesSchema);