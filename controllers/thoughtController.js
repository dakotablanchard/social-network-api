const { Thought, User, Comment } = require('../models');

module.exports = {
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .populate({
                    path: 'user',
                    model: 'User',
                    select: 'username'
                });

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single thought
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate({
                    path: 'user',
                    model: 'User',
                    select: 'username'
                })
                .populate({
                    path: 'comments',
                    model: 'Comment',
                    select: 'text',
                    populate: {
                        path: 'user',
                        model: 'User',
                        select: 'username'
                    }
                });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findById(req.body.user);
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            user.thoughts.push(thought._id);
            await user.save();

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            const user = await User.findOne({ thoughts: req.params.thoughtId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this thought' });
            }

            user.thoughts.pull(req.params.thoughtId);

            await user.save();

            await Thought.findByIdAndRemove(req.params.thoughtId);

            res.json({ message: 'Thought deleted' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Add a comment to a thought
    async addComment(req, res) {
        try {
            const comment = await Comment.create(req.body);

            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            thought.comments.push(comment._id);
            await thought.save();

            res.json(comment);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a comment from a thought
    async deleteComment(req, res) {
        try {
            const comment = await Comment.findByIdAndRemove(req.params.commentId);
            if (!comment) {
                return res.status(404).json({ message: 'No comment with that ID' });
            }

            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { comments: req.params.commentId } },
                { new: true }
            );

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};