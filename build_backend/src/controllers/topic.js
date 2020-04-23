"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const topicsRouter = express_1.default.Router();
const Topic = require('../models/topicModel');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
topicsRouter.get('/chats', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield Chat.find({});
        res.json(chats.map((c) => c.toJSON()));
    }
    catch (e) {
        next(e);
    }
}));
topicsRouter.post('/chats', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = yield User.findById(body.user_id);
        const topic = yield Topic.findById(body.topic_id);
        const chat = new Chat({
            message: body.message,
            user_id: user._id,
            topic_id: topic._id
        });
        const savedChat = yield chat.save();
        res.json(savedChat.toJSON());
    }
    catch (e) {
        next(e);
    }
}));
topicsRouter.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield Topic.find({});
        res.json(topics.map((t) => t.toJSON()));
    }
    catch (e) {
        next(e);
    }
}));
topicsRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = yield Topic.findById(req.params.id);
        res.json(topic.toJSON());
    }
    catch (e) {
        next(e);
    }
}));
topicsRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = yield User.findById(body.user_id);
        const topic = new Topic({
            name: body.name,
            user_id: user._id
        });
        const savedTopic = yield topic.save();
        res.json(savedTopic.toJSON());
    }
    catch (e) {
        next(e);
    }
}));
topicsRouter.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        const user = yield User.findById(decodedToken.id);
        const topic = yield Topic.findById(req.params.id);
        if (topic.user_id.toString() === user._id.toString()) {
            yield Chat.deleteMany({ topic_id: topic._id });
            yield Topic.findByIdAndRemove(req.params.id);
            res.status(204).end();
        }
        else {
            res.status(401).json({ error: 'only the user who added the topic can delete it' });
        }
        ;
    }
    catch (e) {
        next(e);
    }
}));
module.exports = topicsRouter;
