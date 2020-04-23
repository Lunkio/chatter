"use strict";
const getTokenFrom = (req) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    else {
        return null;
    }
    ;
};
const tokenExtractor = (req, _res, next) => {
    req.token = getTokenFrom(req);
    next();
};
const errorHandler = (error, _req, res, next) => {
    if (error.name === 'CastError' && error.path === '_id') {
        return res.status(400).send({ error: 'id not found' });
    }
    else if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        return (res.status(401).json({ error: 'invalid token' }));
    }
    else if (error.constraint === 'unique_username') {
        return (res.status(400).json({ error: 'not unique username' }));
    }
    next(error);
};
const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
module.exports = {
    tokenExtractor,
    errorHandler,
    unknownEndpoint
};
