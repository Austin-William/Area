const express = require('express');
const { getTemp, getWeather } = require('../controllers/weatherController');

const router = express.Router();

router.post('/weather/temp/:town', getTemp);
router.post('/weather/sky/:city', getWeather);

module.exports = {
    routes: router
}