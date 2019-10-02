const express = require('express');
const router = express.Router();
const MaxWeight = require('../../models/MaxWeight');

router.post('/',
    async(req, res) => {
        const { userId, name, date, weight, unit, count } = req.body;
        try{
            const prevMaxWeight = await MaxWeight.find({ userId: userId, name: name });
            if(prevMaxWeight.length == 0 || prevMaxWeight[0].weight < weight){
                const maxWeightRemoved = await MaxWeight.deleteOne({ userId: userId, name: name });
                let maxWeight = new MaxWeight({
                    userId,
                    name,
                    date,
                    weight,
                    unit,
                    count
                })
                await maxWeight.save();
                res.send('Maxweight added!');
            }
            else{
                res.send('No change in max weight');
            }            
        }
        catch(err){

        }
    }
)

router.post('/weight',
    async(req, res) => {
        try{
            const { userId, category, name } = req.body;
            const maxWeight = await MaxWeight.findOne({ userId: userId, name: name });
            res.json(maxWeight);
        }
        catch(err){

        }
    }
)

module.exports = router;