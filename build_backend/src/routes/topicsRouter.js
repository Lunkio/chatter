"use strict";
// import express from 'express';
// const topicsRouter = express.Router();
// import { client } from '../index';
// const jwt = require('jsonwebtoken');
// topicsRouter.get('/chats', async (_req, res) => {
//     try {
//         const chats = await client.query(
//             `SELECT * FROM chats`
//         );
//         res.json(chats.rows);
//     } catch (e) {
//         res.send('Error');
//     }
// });
// topicsRouter.post('/chats', async (req, res, next) => {
//     const body = req.body;
//     try {
//         await client.query('BEGIN');
//         const userId = await client.query(
//             `SELECT id FROM users WHERE id = $1`, [body.user_id]
//         );
//         const topicId = await client.query(
//             `SELECT id FROM topics WHERE id = $1`, [body.topic_id]
//         );
//         if (userId.rowCount === 0 || topicId.rowCount === 0) {
//             throw new Error('User or topic was not found');
//         };
//         const chat = {
//             message: body.message,
//             user_id: userId.rows[0].id,
//             topic_id: topicId.rows[0].id
//         };
//         await client.query(
//             `INSERT INTO chats (message, user_id, topic_id)
//             VALUES ($1, $2, $3)`, [chat.message, chat.user_id, chat.topic_id]
//         );
//         await client.query('COMMIT');
//         const newChat = await client.query(
//             `SELECT * FROM chats WHERE message = $1
//             AND user_id = $2 AND topic_id = $3`,
//             [chat.message, chat.user_id, chat.topic_id]
//         );
//         res.json(newChat.rows[0]);
//     } catch (e) {
//         await client.query('ROLLBACK');
//         res.status(404).json({ error: `${e}` });
//         next(e);
//     }
// });
// topicsRouter.get('/', async (_req, res) => {
//     try {
//         const topics = await client.query(
//             `SELECT * FROM topics`
//         );
//         res.json(topics.rows);
//     } catch (e) {
//         res.send('Error');
//     }
// });
// topicsRouter.get('/:id', async (req, res) => {
//     try {
//         const topic = await client.query(
//             'SELECT * FROM topics WHERE id = $1', [req.params.id]
//         );
//         if (topic.rows.length === 0) {
//             throw new Error('Topic not found');
//         };
//         res.json(topic.rows);
//     } catch (e) {
//         res.status(404).send({ error: `${e}` });
//     }
// });
// topicsRouter.post('/', async (req, res, next) => {
//     const body = req.body;
//     try {
//         await client.query('BEGIN');
//         const userId = await client.query(
//             `SELECT id FROM users WHERE id = $1`, [body.user_id]
//         );
//         if (userId.rowCount === 0) {
//             throw new Error('User not found');
//         };
//         const topic = {
//             name: body.name,
//             user_id: userId.rows[0].id
//         };
//         await client.query(
//             `INSERT INTO topics (name, user_id) VALUES ($1, $2)`,
//             [topic.name, topic.user_id]
//         );
//         await client.query('COMMIT');
//         const newTopic = await client.query(
//             `SELECT * FROM topics WHERE name = $1 AND user_id = $2`,
//             [topic.name, topic.user_id]
//         );
//         res.json(newTopic.rows[0]);
//     } catch (e) {
//         await client.query('ROLLBACK');
//         res.status(404).json({ error: `${e}` });
//         next(e);
//     }
// });
// topicsRouter.delete('/:id', async (req, res, next) => {
//     try {
//         const decodedToken = jwt.verify(req.token, process.env.SECRET);
//         await client.query('BEGIN');
//         const user = await client.query(
//             `SELECT id, username, name FROM users WHERE id = $1`,
//             [decodedToken.id]
//         );
//         const topic = await client.query(
//             `SELECT * FROM topics WHERE id = $1`, [req.params.id]
//         );
//         if (user.rows[0].id === topic.rows[0].user_id) {
//             await client.query(
//                 `DELETE FROM chats WHERE topic_id = $1`, [req.params.id]
//             );
//             const result = await client.query(
//                 `DELETE FROM topics WHERE id = $1`, [req.params.id]
//             );
//             if (result.rowCount === 0) {
//                 throw new Error('Topic not found');
//             };
//             await client.query('COMMIT');
//             res.status(204).end();
//         } else {
//             await client.query('ROLLBACK');
//             res.status(401).json({ error: 'only the user who added the topic can delete it' });
//         };
//     } catch (e) {
//         await client.query('ROLLBACK');
//         res.status(404).json({ error: `${e}` });
//         next(e);
//     }
// });
// module.exports = topicsRouter;
