"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = index_1.mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});
userSchema.plugin(uniqueValidator);
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = index_1.mongoose.model('User', userSchema);
