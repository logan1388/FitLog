const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator/check');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please use a valid email').isEmail(),
    check(
        'password', 
        'please enter password with minimum of 6 characters'
    ).isLength({
        min: 6
    })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, email, password } = req.body;
    try{
        let user = await User.findOne({ email });
        if(user){
            res.status(400).json({ 
                errors: [{ msg : 'Email already exists' }] 
            });
        }
        user = new User ({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();
        
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtToken'),
            { expiresIn : 3600 },
            (err, token) => {
                if(err)
                    throw err;
                res.json({ token });
            }
        )
        res.send('User registered!');
    }
    catch(err){

    }
});

router.post('/authenticate', [
    check('email', 'Please use a valid email').isEmail(),
    check(
        'password', 
        'please enter password with minimum of 6 characters'
    ).isLength({
        min: 6
    })
],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            let passwordMatch = false;
            if(user && user.email === email){
                bcrypt.compare(password, user.password, function(err, result) {
                    passwordMatch = result;
                    if(!passwordMatch){
                        res.send('Invalid Password');
                    }
                    const payload = {
                        user: {
                            id: user._id
                        }
                    };
            
                    jwt.sign(
                        payload, 
                        config.get('jwtToken'),
                        { expiresIn : 3600 },
                        (err, token) => {
                            if(err)
                                throw err;
                            const user = {
                                id: payload.user.id,
                                token: token
                            }
                            res.json({ user });
                        }
                    )
                });
            }
            else{
                res.send('User not found');
            }
        }
        catch(err){

        }
    }
)

module.exports = router;