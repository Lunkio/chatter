const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import express from 'express';
const loginRouter = express.Router();
const User = require('../models/userModel');

loginRouter.post('/', async (req, res, next) => {
    const body = req.body;
    try {
        const user = await User.findOne({ username: body.username });
        const correctPsw = user === null
            ? false
            : await bcrypt.compare(body.password, user.passwordHash);

        if (!(user && correctPsw)) {
            return res.status(401).json({ error: 'invalid username or password' });
        };

        const userToken = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(userToken, process.env.SECRET);
        return res.status(200).send({ token, username: user.username, name: user.name, id: user._id });
    } catch (e) {
        next(e);
        return;
    }
});

module.exports = loginRouter;