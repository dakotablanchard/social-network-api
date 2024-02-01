const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
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
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;