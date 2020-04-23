"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const chatSchema = index_1.mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user_id: {
        type: index_1.mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    topic_id: {
        type: index_1.mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }
});
chatSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = index_1.mongoose.model('Chat', chatSchema);
