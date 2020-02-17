const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {type: String, required: true},
    contactInfo: {
        email: {type: String, required: true},
        phoneNumber: {type: String},
    },
    location: {
        postalCode: {type: String},
        city: {type: String},
        county: {type: String},
        street: {type: String},
        houseNumber: {type: Number},
        houseNumberAddition: {type: String},
    },
    objectForSale: {type: Boolean}
})

module.exports = mongoose.model('User', userSchema);