const {Router} = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('route works!')
});

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(401).json({
            message: 'Fields must have values'
        })
    }
    const userFound = await User.findOne({email});
    if (userFound) {
        return res.status(401).json(
            {
                message: 'User already exists'
            }
        )
    }
    const newUser = new User({email, password});
    await newUser.save();
    const token = await jwt.sign(
        {_id: newUser._id},
        'secretkey',
        {expiresIn: '1d'}
    );
    res.status(201).json({
        message: 'success',
        token
    });
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(401).json({
            message: 'Email and Password must not be empty'
        })
    }
    const user = await User.findOne({email});
    if (!user) return res.status(401).send('The email doen\' exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

    const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({
        message: 'success',
        token
    });
});

router.get('/tasks', (req, res) => {
    res.json({message: ''})
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json({message: ''})
});

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request');
        }

        const payload = await jwt.verify(token, 'secretkey');
        if (!payload) {
            return res.status(401).send('Unauhtorized Request');
        }
        req.userId = payload._id;
        next();
    } catch (e) {
        //console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}

module.exports = router;
