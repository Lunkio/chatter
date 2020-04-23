import { mongoose } from '../index';

const chatSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    topic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }
});

chatSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Chat', chatSchema);