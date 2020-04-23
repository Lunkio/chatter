import express from 'express';
const blogsRouter = express.Router();
import { client } from '../index';
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (_req, res) => {
    try {
        const blogs = await client.query(
            `SELECT * FROM blogs`
        );
        res.json(blogs.rows);
    } catch (e) {
        res.send('Error');
    }
});

blogsRouter.get('/:id', async (req, res) => {
    try {
        const blog = await client.query(
            `SELECT * FROM blogs WHERE id = $1`, [req.params.id]
        );
        if (blog.rows.length === 0) {
            throw new Error('Blog not found');
        };
        res.json(blog.rows);
    } catch (e) {
        res.status(404).send({ error: `${e}` });
    }
})

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body;
    //console.log('body', body);
    try {
        await client.query('BEGIN');
        const userId = await client.query(
            'SELECT id FROM users WHERE id = $1',
            [body.user_id]
        );
        if (userId.rowCount === 0) {
            throw new Error('User not found');
        };
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0,
            comments: [],
            user_id: userId.rows[0].id
        };
        await client.query(
            `INSERT INTO blogs (title, author, url, likes, comments, user_id)
            VALUES ($1, $2, $3, $4, $5, $6)`, [blog.title, blog.author, blog.url, blog.likes, blog.comments, blog.user_id]
        );
        await client.query('COMMIT');
        const newBlog = await client.query(
            `SELECT * FROM blogs WHERE title = $1
            AND author = $2 AND url = $3 AND likes = $4 AND user_id = $5`,
            [blog.title, blog.author, blog.url, blog.likes, blog.user_id]
        );
        res.json(newBlog.rows[0]);
    } catch (e) {
        //console.log('error', e);
        await client.query('ROLLBACK');
        res.status(404).json({ error: `${e}` });
        next(e);
    }
});

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body;
    try {
        await client.query('BEGIN');
        const blog = await client.query(
            `UPDATE blogs SET title = $1, author = $2,
            url = $3, likes = $4, comments = $5 WHERE id = $6 RETURNING id`,
            [body.title, body.author, body.url, body.likes, body.comments, req.params.id]
        );
        if (blog.rows.length === 0) {
            throw new Error('Blog not found');
        };
        await client.query('COMMIT');
        const updatedBlog = await client.query(
            `SELECT * FROM blogs WHERE id = $1`,
            [blog.rows[0].id]
        );
        res.json(updatedBlog.rows[0]);
    } catch (e) {
        //console.log('error', e);
        await client.query('ROLLBACK');
        res.status(404).send({ error: `${e}` });
    }
});

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);

        await client.query('BEGIN');
        const user = await client.query(
            `SELECT id, username, name FROM users WHERE id = $1`,
            [decodedToken.id]
        );
        const blog = await client.query(
            `SELECT * FROM blogs WHERE id = $1`, [req.params.id]
        );
        //console.log('blog', blog)
        if (user.rows[0].id === blog.rows[0].user_id) {
            const result = await client.query(
                `DELETE FROM blogs WHERE id = $1`, [req.params.id]
            );
            if (result.rowCount === 0) {
                throw new Error('Blog not found');
            };
            await client.query('COMMIT');
            res.status(204).end();
        } else {
            await client.query('ROLLBACK');
            res.status(401).json({ error: 'only the user who added the blog can delete it' });
        };        
    } catch (e) {
        //console.log('error', e);
        await client.query('ROLLBACK');
        res.status(404).json({ error: `${e}` });
        next(e);
    }
});

module.exports = blogsRouter;