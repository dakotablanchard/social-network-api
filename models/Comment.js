const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.Types.ObjectId,
            ref : 'User',
            required: true,
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

const Comment = model('Comment', commentSchema);

module.exports = Comment;