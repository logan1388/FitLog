const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const ChestWorkoutlog = require('../../models/Workoutlog').ChestWorkoutlog;
const LegWorkoutlog = require('../../models/Workoutlog').LegWorkoutlog;
const BackWorkoutlog = require('../../models/Workoutlog').BackWorkoutlog;
const TricepsWorkoutlog = require('../../models/Workoutlog').TricepsWorkoutlog;

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
router.get('/:category/:name',
    async(req, res) => {
        try{
            const name = req.params.name;
            switch(req.params.category){
                case 'Chest': {
                    const exerciselogs = await ChestWorkoutlog.find({ name: name}).sort({ date: -1 });
                    res.json(exerciselogs);
                    break;
                }
                case 'Leg': {
                    const exerciselogs = await LegWorkoutlog.find({ name: name}).sort({ date: -1 });
                    res.json(exerciselogs);
                    break;
                }
                case 'Back': {
                    const exerciselogs = await BackWorkoutlog.find({ name: name}).sort({ date: -1 });
                    res.json(exerciselogs);
                    break;
                }
                case 'Triceps': {
                    const exerciselogs = await TricepsWorkoutlog.find({ name: name}).sort({ date: -1 });
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