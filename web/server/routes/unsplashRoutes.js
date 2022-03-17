const express = require('express');
const { getUnsplashPicture, getRandomUnsplashPicture, setTimerUnsplash } = require('../controllers/unsplashController');

const router = express.Router();

router.post('/unsplash/:photo', getUnsplashPicture);
router.post('/unsplash/timer/:timer', setTimerUnsplash);
router.post('/unsplash/random', getRandomUnsplashPicture);

module.exports = {
    routes: router
}