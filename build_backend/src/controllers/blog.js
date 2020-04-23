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
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const blogsRouter = express_1.default.Router();
const jwt = require('jsonwebtoken');
blogsRouter.get('/', (_res, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog.find({});
        res.json(blogs.map((b) => b.toJSON()));
    }
    catch (e) {
        next(e);
    }
}));
blogsRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog.findById(req.params.id);
        res.json(blog.toJSON());
    }
    catch (e) {
        next(e);
    }
}));
blogsRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = yield User.findById(body.user_id);
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0,
            comments: [],
            user_id: user._id
        });
        const savedBlog = yield blog.save();
        res.json(savedBlog.toJSON());
    }
    catch (e) {
        next(e);
    }
}));
blogsRouter.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            comments: body.comments
        };
        const editedBlog = yield Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
        res.json(editedBlog.toJSON());
    }
    catch (e) {
        next(e);
    }
}));
blogsRouter.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        const user = yield User.findById(decodedToken.id);
        const blog = yield Blog.findById(req.params.id);
        if (blog.user_id.toString() === user._id.toString()) {
            yield Blog.findByIdAndRemove(req.params.id);
            res.status(204).end();
        }
        else {
            res.status(401).json({ error: 'only the user who added the blog can delete it' });
        }
    }
    catch (e) {
        next(e);
    }
}));
module.exports = blogsRouter;
