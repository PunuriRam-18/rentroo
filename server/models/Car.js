const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    pricePerDay: {
        type: Number,
        required: true
    },

    fuelType: {
        type: String,
        required: true
    },

    seats: {
        type: Number,
        required: true
    },

    image: {
        type: String
    }

}, {
    timestamps: true
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;