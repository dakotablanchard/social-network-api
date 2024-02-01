const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController.js');

// /api/users
// Get all users or create a new user
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
// Get a single user, update a user, or delete a user
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;