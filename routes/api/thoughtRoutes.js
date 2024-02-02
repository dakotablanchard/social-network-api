const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addComment,
    deleteComment
} = require('../../controllers/thoughtController');

// /api/thoughts
// Get all thoughts or create a new thought
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
// Get a single thought, update a thought, delete a thought, or add a comment to a thought
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
    .post(addComment);

// /api/thoughts/comments/:thoughtId
// Delete a comment
router.route('/:thoughtId/:commentId')
    .delete(deleteComment);

module.exports = router;