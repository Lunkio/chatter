"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
exports.mongoose = require('mongoose');
require('dotenv').config();
const config = require('./utils/config');
const cors = require('cors');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blog');
const topicsRouter = require('./controllers/topic');
exports.mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Failed to connect to MongoDB'));
app.use(cors());
app.use(express_1.default.json());
app.use(middleware.tokenExtractor);
app.use(express_1.default.static('build'));
app.use('/topics', express_1.default.static('build'));
app.use('/blogs', express_1.default.static('build'));
app.use('/users', express_1.default.static('build'));
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/topics', topicsRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
io.on('connection', (socket) => {
    console.log('socket-io connected');
    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    });
    socket.on('topic', (topic) => {
        io.emit('topic', topic);
    });
});
const port = config.PORT || 3001;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
