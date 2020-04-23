"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const blogSchema = index_1.mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: String,
    likes: Number,
    comments: [String],
    user_id: {
        type: index_1.mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
blogSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = index_1.mongoose.model('Blog', blogSchema);
