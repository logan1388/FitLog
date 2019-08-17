const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = Exercise = mongoose.model('exercise', exerciseSchema);