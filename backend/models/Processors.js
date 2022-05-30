const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProcessorsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gateway: {
        type: String,
        required: true
    },
    mask_name: {
        type: String,
        required: true
    },
    available_payment_methods: {
        type: String,
        required: true
    }
});
  
module.exports = Processors = mongoose.model('processors', ProcessorsSchema);