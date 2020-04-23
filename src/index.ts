import express from 'express';
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
export const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./utils/config');
const cors = require('cors');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blog');
const topicsRouter = require('./controllers/topic');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Failed to connect to MongoDB'));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use(express.static('build'));
app.use('/topics', express.static('build'));
app.use('/blogs', express.static('build'));
app.use('/users', express.static('build'));

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/topics', topicsRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

io.on('connection', (socket: any) => {
    console.log('socket-io connected');
    socket.on('chat message', (message: any) => {
        io.emit('chat message', message);
    });
    socket.on('topic', (topic: any) => {
        io.emit('topic', topic);
    });
});

const port = config.PORT || 3001;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});