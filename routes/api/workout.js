const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator/check');
const Workout = require('../../models/Workout');
//const config = require('config');
const moment = require('moment');

// @route   POST api/workout
// @desc    Insert today's workout
router.post('/', 
[
    check('userId', 'User ID is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { userId, category, date } = req.body;
    try{
        let start = moment().startOf('day');
        let end = moment().endOf('day');
        let todayWorkout = await Workout.find({ userId, date: {$gte: start, $lt: end} });
        let exists = false;
        for(let wo of todayWorkout){
            if(wo.category == category){
                exists = true;
                res.send('Workout already exists');
                break;
            }
        }  
        if(!exists){
            let workout = new Workout ({
                userId,
                category,
                date
            })   
            await workout.save();
            res.send('Workout added!');
        }           
    }
    catch(err){

    }
});

router.post('/workoutHistory',
    async(req, res) => {
        const userId = req.body.userId;
        try {
            let start = moment().startOf('day');
            const workoutHistory = await Workout.find({ userId, date: {$lt: start} }).sort({ date: -1 });
            res.json(workoutHistory);
        }
        catch(err){

        }
    }
)

module.exports = router;