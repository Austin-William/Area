const express = require('express');
const { getTwitterTrendsWorld, getTwitterTrendsFrance, getTwitterLocation, getLastTweets, getTimeIntervalTwitter } = require('../controllers/twitterController');

const router = express.Router();

router.post('/twitter/trends/world', getTwitterTrendsWorld);
router.post('/twitter/trends/france', getTwitterTrendsFrance);
router.post('/twitter/location/lat=:lat&long=:long', getTwitterLocation);
router.post('/twitter/last', getLastTweets);
router.post('/twitter/timeInterval/:sec', getTimeIntervalTwitter);

module.exports = {
    routes: router
}