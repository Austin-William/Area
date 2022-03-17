const express = require('express');
const { setEmailController, getEmail } = require('../controllers/emailController');
const { reactionController, setInterval } = require('../controllers/reactionController');

const router = express.Router();

// Routes to set the reaction type
router.post('/reactions/:type', reactionController);
router.post('/reactions/timer/:interval', setInterval);

// Email routes
router.post('/email/:receiver', setEmailController);
router.get('/email', getEmail);

// SMS routes

// Body : api, data

module.exports = {
    routes: router
}