const mongoose = require('mongoose');

const maxweightSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = MaxWeight = mongoose.model('maxweight', maxweightSchema);