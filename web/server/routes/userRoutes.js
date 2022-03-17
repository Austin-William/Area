const express = require('express');
const {addUser, getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/userController');

const router = express.Router();

router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:login', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = {
    routes: router
}