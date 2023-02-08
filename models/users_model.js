const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });

mongoose.set('strictQuery', false);
module.exports = mongoose.model('user', userSchema);