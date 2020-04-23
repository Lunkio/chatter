import express from 'express';
const topicsRouter = express.Router();
const Topic = require('../models/topicModel');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

topicsRouter.get('/chats', async (_req, res, next) => {
    try {
        const chats = await Chat.find({});
        res.json(chats.map((c: any) => c.toJSON()));
    } catch (e) {
        next(e);
    }
});

topicsRouter.post('/chats', async (req, res, next) => {
    const body = req.body;
    try {
        const user = await User.findById(body.user_id);
        const topic = await Topic.findById(body.topic_id);

        const chat = new Chat({
            message: body.message,
            user_id: user._id,
            topic_id: topic._id
        });

        const savedChat = await chat.save();
        res.json(savedChat.toJSON());
    } catch (e) {
        next(e);
    }
});

topicsRouter.get('/', async (_req, res, next) => {
    try {
        const topics = await Topic.find({});
        res.json(topics.map((t: any) => t.toJSON()));
    } catch (e) {
        next(e);
    }
});

topicsRouter.get('/:id', async (req, res, next) => {
    try {
        const topic = await Topic.findById(req.params.id);
        res.json(topic.toJSON());
    } catch (e) {
        next(e);
    }
});

topicsRouter.post('/', async (req, res, next) => {
    const body = req.body;
    try {
        const user = await User.findById(body.user_id);
        const topic = new Topic({
            name: body.name,
            user_id: user._id
        });

        const savedTopic = await topic.save();
        res.json(savedTopic.toJSON());
    } catch (e) {
        next(e);
    }
});

topicsRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        const user = await User.findById(decodedToken.id);
        const topic = await Topic.findById(req.params.id);

        if (topic.user_id.toString() === user._id.toString()) {
            await Chat.deleteMany({ topic_id: topic._id });
            await Topic.findByIdAndRemove(req.params.id);
            res.status(204).end();
        } else {
            res.status(401).json({ error: 'only the user who added the topic can delete it' });
        };
    } catch (e) {
        next(e);
    }
});

module.exports = topicsRouter;