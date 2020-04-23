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
const usersRouter = express_1.default.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
usersRouter.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find({});
        res.json(users.map((u) => u.toJSON()));
    }
    catch (e) {
        next(e);
    }
}));
usersRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        res.json(user.toJSON());
    }
    catch (e) {
        next(e);
    }
}));
usersRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const saltRounds = 10;
        const passwordHash = yield bcrypt.hash(body.password, saltRounds);
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        });
        const savedUser = yield user.save();
        res.json(savedUser.toJSON());
    }
    catch (e) {
        next(e);
    }
}));
usersRouter.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = {
            name: body.name
        };
        const editedUser = yield User.findByIdAndUpdate(req.params.id, user, { new: true });
        res.json(editedUser.toJSON());
    }
    catch (e) {
        next(e);
    }
}));
usersRouter.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        const user = yield User.findById(decodedToken.id);
        if (user) {
            yield User.findByIdAndRemove(req.params.id);
            res.status(204).end();
        }
        else {
            res.status(401).json({ error: 'user can only delete itself' });
        }
    }
    catch (e) {
        next(e);
    }
}));
module.exports = usersRouter;
