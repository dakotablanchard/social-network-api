const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

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

// /api/users/:userId/:friendId
// Add or delete a friend from a user's friend list
router.route('/:userId/:friendId')
    .put(addFriend)
    .delete(deleteFriend);

module.exports = router;