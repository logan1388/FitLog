const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const ChestWorkoutlog = require('../../models/Workoutlog').ChestWorkoutlog;
const LegWorkoutlog = require('../../models/Workoutlog').LegWorkoutlog;
const BackWorkoutlog = require('../../models/Workoutlog').BackWorkoutlog;

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
        const { name, date, weight, unit, count } = req.body;
        try{
            let workoutlog = {};
            switch(req.body.category){
                case 'chest': {
                    workoutlog = new ChestWorkoutlog({
                        name,
                        date,
                        weight,
                        unit,
                        count
                    });
                    break;
                }
                case 'leg': {
                    workoutlog = new LegWorkoutlog({
                        name,
                        date,
                        weight,
                        unit,
                        count
                    });
                    break;
                }
                case 'back': {
                    workoutlog = new BackWorkoutlog({
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
                case 'chest': {
                    const exerciselogs = await ChestWorkoutlog.find({ name: name});
                    res.json(exerciselogs);
                    break;
                }
                case 'leg': {
                    const exerciselogs = await LegWorkoutlog.find({ name: name});
                    res.json(exerciselogs);
                    break;
                }
                case 'back': {
                    const exerciselogs = await BackWorkoutlog.find({ name: name});
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