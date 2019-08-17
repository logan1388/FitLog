const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator/check');
const Exercise = require('../../models/Exercise');
const config = require('config');

// @route   POST api/exercises
// @desc    Insert a new exercise
router.post('/', 
[
    check('category', 'Category is required').not().isEmpty()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { category, name } = req.body;
    try{
        let exercise = await Exercise.findOne({ name });
        if(exercise){
            res.status(400).json({ 
                errors: [{ msg : 'Exercise already exists' }] 
            });
        }
        exercise = new Exercise ({
            category,
            name
        })

        await exercise.save();
        res.send('Exercise added!');
    }
    catch(err){

    }
});

// @route   GET api/exercises
// @desc    Get all exercises
router.get('/',
    async(req, res) => {
        try{
            const exercises = await Exercise.find();
            res.json(exercises);
        }
        catch(err){

        }
    }
)

// @route   GET api/exercises/:category
// @desc    Get exercises by category
router.get('/:category',
    async(req, res) => {
        try{
            const exercises = await Exercise.find({ category: req.params.category });
            res.json(exercises);
        }
        catch(err){

        }
    }
)

// @route   DELETE api/exercises/:name
// @desc    Delete an exercise by name
router.delete('/:name',
    async(req, res) => {
        try{
            const exercise = await Exercise.deleteOne({ name: req.params.name });
            res.json(exercise);
        }
        catch(err){

        }
    }
)

module.exports = router;