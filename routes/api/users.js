const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');



// @route  POST api/user
// @desc    Register User
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;


    try {
        //Check User exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            });
        }

        //Get user Gravitar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })
        //Encrypt USer password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //return jsonWebToken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtToken'), 
        {  expiresIn: 3600000},
         (error, token) => {
            if (error) { throw error }
            res.json({ token })
        });

        //res.send('User Registered');
    } catch (error) {
        console.log(error.message);
        res.send(500).send('Server Error');
    }



});


module.exports = router;