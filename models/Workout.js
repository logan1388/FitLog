const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = Workout = mongoose.model('workout', workoutSchema);