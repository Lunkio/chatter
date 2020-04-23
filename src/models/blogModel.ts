import { mongoose } from '../index';

const blogSchema = mongoose.Schema({
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
    comments: [ String ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

blogSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema);