import express from 'express';
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const blogsRouter = express.Router();
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (_res, res, next) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs.map((b: any) => b.toJSON()));
    } catch (e) {
        next(e);
    }
});

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog.toJSON());
    } catch (e) {
        next(e);
    }
});

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body;
    try {
        const user = await User.findById(body.user_id);
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0,
            comments: [],
            user_id: user._id
        });

        const savedBlog = await blog.save();
        res.json(savedBlog.toJSON());
    } catch (e) {
        next(e);
    }
});

blogsRouter.put('/:id', async (req, res, next) => {
    const body = req.body;
    try {
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            comments: body.comments
        };
        const editedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
        res.json(editedBlog.toJSON());
    } catch (e) {
        next(e);
    }
});

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        const user = await User.findById(decodedToken.id);
        const blog = await Blog.findById(req.params.id);
        
        if (blog.user_id.toString() === user._id.toString()) {
            await Blog.findByIdAndRemove(req.params.id);
            res.status(204).end();
        } else {
            res.status(401).json({ error: 'only the user who added the blog can delete it' });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = blogsRouter;