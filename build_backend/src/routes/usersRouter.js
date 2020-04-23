"use strict";
// const bcrypt = require('bcryptjs');
// import express from 'express';
// import { client } from '../index';
// const usersRouter = express.Router();
// usersRouter.get('/', async (_req, res) => {
//     try {
//         const users = await client.query(`SELECT id, username, name FROM users`);
//         //res.send(JSON.stringify(users.rows));
//         res.json(users.rows);
//     } catch (e) {
//         res.send('Error');
//     }
// });
// usersRouter.get('/:id', async (req, res) => {
//     try {
//         const user = await client.query(
//             `SELECT id, username, name FROM users
//             WHERE id = $1`, [req.params.id]
//         );
//         if (user.rows.length === 0) {
//             throw new Error('User not found');
//         };
//         res.json(user.rows);
//     } catch (e) {
//         res.status(404).send({ error: `${e}` });
//     }
// })
// usersRouter.post('/', async (req, res, next) => {
//     const body = req.body;
//     //console.log('body', body);
//     try {
//         const saltRounds = 10;
//         const passwordHash = await bcrypt.hash(body.password, saltRounds);
//         const user = {
//             username: body.username,
//             name: body.name,
//             passwordHash
//         };
//         await client.query('BEGIN');
//         await client.query(
//             `INSERT INTO users (username, name, passwordhash)
//             VALUES ($1, $2, $3)`, [user.username, user.name, user.passwordHash]
//         );
//         await client.query('COMMIT');
//         const savedUser = await client.query(`SELECT * FROM users WHERE username = $1`, [user.username]);
//         //console.log('SAVEDUSER', savedUser.rows[0]);
//         res.json(savedUser.rows[0]);
//     } catch (e) {
//         //console.log('ERROR', e.constraint);
//         await client.query('ROLLBACK');
//         next(e);
//     }
// });
// usersRouter.put('/:id', async (req, res) => {
//     const body = req.body;
//     try {
//         await client.query('BEGIN');
//         const user = await client.query(
//             `UPDATE users SET name = $1 WHERE id = $2 RETURNING id`,
//             [body.name, req.params.id]
//         );
//         //console.log('user', user);
//         if (user.rows.length === 0) {
//             throw new Error('User not found');
//         };
//         await client.query('COMMIT');
//         const updatedUser = await client.query(
//             `SELECT id, username, name FROM users WHERE id = $1`,
//             [user.rows[0].id]
//         );
//         res.json(updatedUser.rows[0]);
//     } catch (e) {
//         await client.query('ROLLBACK');
//         res.status(404).send({ error: `${e}` });
//     }
// });
// usersRouter.delete('/:id', async (req, res) => {
//     try {
//         await client.query('BEGIN');
//         await client.query(
//             'DELETE FROM blogs WHERE user_id = $1', [req.params.id]
//         );
//         const result = await client.query(
//             `DELETE FROM users WHERE id = $1`, [req.params.id]
//         );
//         if (result.rowCount === 0) {
//             throw new Error('User not found');
//         };
//         await client.query('COMMIT');
//         res.status(204).end();
//     } catch (e) {
//         //console.log('ERROR', e);
//         await client.query('ROLLBACK');
//         res.status(404).json({ error: `${e}` });
//     }
// });
// module.exports = usersRouter;
