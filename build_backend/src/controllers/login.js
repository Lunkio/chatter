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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
const User = require('../models/userModel');
loginRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = yield User.findOne({ username: body.username });
        const correctPsw = user === null
            ? false
            : yield bcrypt.compare(body.password, user.passwordHash);
        if (!(user && correctPsw)) {
            return res.status(401).json({ error: 'invalid username or password' });
        }
        ;
        const userToken = {
            username: user.username,
            id: user._id
        };
        const token = jwt.sign(userToken, process.env.SECRET);
        return res.status(200).send({ token, username: user.username, name: user.name, id: user._id });
    }
    catch (e) {
        next(e);
        return;
    }
}));
module.exports = loginRouter;
