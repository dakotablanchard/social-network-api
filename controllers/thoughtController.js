const { Thought } = require('../models');

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
                .populate('comments');

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
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Add a comment to a thought
    async addComment(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { comments: req.body } },
                { new: true }
            );

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a comment from a thought
    async deleteComment(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { comments: { _id: req.params.commentId } } },
                { new: true }
            );

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};