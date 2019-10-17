const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const ChestWorkoutlog = require('../../models/Workoutlog').ChestWorkoutlog;
const LegWorkoutlog = require('../../models/Workoutlog').LegWorkoutlog;
const BackWorkoutlog = require('../../models/Workoutlog').BackWorkoutlog;
const TricepsWorkoutlog = require('../../models/Workoutlog').TricepsWorkoutlog;
const ShoulderWorkoutlog = require('../../models/Workoutlog').ShoulderWorkoutlog;
const BicepsWorkoutlog = require('../../models/Workoutlog').BicepsWorkoutlog;

const MaxWeight = require('../../models/MaxWeight');

//@route POST api/workoutlog
//@desc Insert workoutlog for a particular exercise
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('date', 'Date is required').not().isEmpty(),
        check('weight', 'Weight is required').not().isEmpty(),
        check('unit', 'Unit is required').not().isEmpty(),
        check('count', 'Count is required').not().isEmpty()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        const { userId, name, date, weight, unit, count } = req.body;
        try{
            let workoutlog = {};
            switch(req.body.category){
                case 'Chest': {
                    workoutlog = new ChestWorkoutlog({
                        userId,
                        name,
                        date,
                        weight,
                        unit,
                        count
                    });
                    break;
                }
                case 'Leg': {
                    workoutlog = new LegWorkoutlog({
                        userId,
                        name,
                        date,
                        weight,
                        unit,
                        count
                    });
                    break;
                }
                case 'Back': {
                    workoutlog = new BackWorkoutlog({
                        userId,
                        name,
                        date,
                        weight,
                        unit,
                        count
                    });
                    break;
                }
                case 'Triceps': {
                    workoutlog = new TricepsWorkoutlog({
                        userId,
                        name,
                        date,
                        weight,
                        unit,
                        count
                    });
                    break;
                }
                case 'Shoulder': {
                    workoutlog = new ShoulderWorkoutlog({
                        userId,
                        name,
                        date,
                        weight,
                        unit,
                        count
                    });
                    break;
                }
                case 'Biceps': {
                    workoutlog = new BicepsWorkoutlog({
                        userId,
                        name,
                        date,
                        weight,
                        unit,
                        count
                    });
                    break;
                }
                default : {
                    res.send(req.body.category+' not found!');
                }
            }

            await workoutlog.save();
            res.send('Workoutlog added!');
        }
        catch(err){

        }
    }
)

//@route GET api/workoutlog/:category/:name
//@desc Get logs for an exercise
router.post('/log',
    async(req, res) => {
        try{
            const { userId, category, name } = req.body;
            switch(category){
                case 'Chest': {
                    let exerciselogs = await ChestWorkoutlog.find({ userId: userId, name: name}).sort({ date: -1 });
                    const maxWeight = await MaxWeight.findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Leg': {
                    let exerciselogs = await LegWorkoutlog.find({ userId: userId, name: name}).sort({ date: -1 });
                    const maxWeight = await MaxWeight.findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Back': {
                    let exerciselogs = await BackWorkoutlog.find({ userId: userId, name: name}).sort({ date: -1 });
                    const maxWeight = await MaxWeight.findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Triceps': {
                    let exerciselogs = await TricepsWorkoutlog.find({ userId: userId, name: name}).sort({ date: -1 });
                    const maxWeight = await MaxWeight.findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Shoulder': {
                    let exerciselogs = await ShoulderWorkoutlog.find({ userId: userId, name: name}).sort({ date: -1 });
                    const maxWeight = await MaxWeight.findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                case 'Biceps': {
                    let exerciselogs = await BicepsWorkoutlog.find({ userId: userId, name: name}).sort({ date: -1 });
                    const maxWeight = await MaxWeight.findOne({ userId: userId, name: name });
                    exerciselogs.map(logs => logs.maxWeight = maxWeight ? maxWeight.weight : '');
                    res.json(exerciselogs);
                    break;
                }
                default: {
                    res.json('Exercise not found');
                }
            }
        }
        catch(err){

        }
    }
)

module.exports = router;