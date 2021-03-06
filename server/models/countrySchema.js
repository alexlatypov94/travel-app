const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    country: {
        type: String,
        required: [true, 'Countryname is required']
    },
    capital: {
        type: String,
        required: [true, 'Capitalname is required']
    },
    info: {
        type: String,
        required: [true, 'Country info is required']
    },
    videoUrl: {
        type: String,
        required: [true, 'VideoURL is required']
    },
    photos: {
        type: Buffer,
        required: [true, 'Photos is required']
    }
})

module.exports = countrySchema