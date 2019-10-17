const mongoose = require('mongoose');

const workoutlogSchema = new mongoose.Schema({
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
    },
    maxWeight: {
        type: Number
    }
});
var ChestWorkoutlog = mongoose.model('chestworkoutlogs', workoutlogSchema);
var LegWorkoutlog = mongoose.model('legworkoutlogs', workoutlogSchema);
var BackWorkoutlog = mongoose.model('backworkoutlogs', workoutlogSchema);
var TricepsWorkoutlog = mongoose.model('tricepsworkoutlogs', workoutlogSchema);
var ShoulderWorkoutlog = mongoose.model('shoulderworkoutlogs', workoutlogSchema);
var BicepsWorkoutlog = mongoose.model('bicepsworkoutlogs', workoutlogSchema);

module.exports = {
    ChestWorkoutlog: ChestWorkoutlog,
    LegWorkoutlog: LegWorkoutlog,
    BackWorkoutlog: BackWorkoutlog,
    TricepsWorkoutlog: TricepsWorkoutlog,
    ShoulderWorkoutlog: ShoulderWorkoutlog,
    BicepsWorkoutlog: BicepsWorkoutlog
}