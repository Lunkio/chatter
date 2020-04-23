import express from 'express';
const usersRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

usersRouter.get('/', async (_req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users.map((u: any) => u.toJSON()));
    } catch (e) {
        next(e);
    }
});

usersRouter.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user.toJSON());
    } catch (e) {
        next(e);
    }
});

usersRouter.post('/', async (req, res, next) => {
    const body = req.body;
    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        });

        const savedUser = await user.save();
        res.json(savedUser.toJSON());
    } catch (e) {
        next(e);
    }
});

usersRouter.put('/:id', async (req, res, next) => {
    const body = req.body;
    try {
        const user = {
            name: body.name
        };

        const editedUser = await User.findByIdAndUpdate(req.params.id, user, { new: true });
        res.json(editedUser.toJSON());
    } catch (e) {
        next(e);
    }
});

usersRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        const user = await User.findById(decodedToken.id);
        
        if (user) {
            await User.findByIdAndRemove(req.params.id);
            res.status(204).end();
        } else {
            res.status(401).json({ error: 'user can only delete itself' });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = usersRouter;