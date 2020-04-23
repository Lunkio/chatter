"use strict";
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// import express from 'express';
// const loginRouter = express.Router();
// import { client } from '../index';
// loginRouter.post('/', async (req, res) => {
//     const body = req.body;
//     //console.log('BODY', body);
//     try {
//         const user = await client.query(
//             `SELECT id, username, name, passwordhash FROM users
//             WHERE username = $1`, [body.username]
//         );
//         if (user.rows.length === 0) {
//             throw new Error();
//         };
//         //console.log('USER', user.rows);
//         const correctPsw = user.rows === null
//             ? false
//             : await bcrypt.compare(body.password, user.rows[0].passwordhash);
//         if (!(user.rows && correctPsw)) {
//             throw new Error();
//         };
//         const userToken = {
//             username: user.rows[0].username,
//             id: user.rows[0].id
//         };
//         const token = jwt.sign(userToken, process.env.SECRET);
//         return res.status(200).send({ token, username: user.rows[0].username, name: user.rows[0].name, id: user.rows[0].id });        
//     } catch (e) {
//         //console.log('error', e);
//         return res.status(401).json({ error: 'invalid username or password' });
//     }
// });
// module.exports = loginRouter;
