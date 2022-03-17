const express = require('express');
const { getNumber } = require('../controllers/covidController');

const router = express.Router();

router.post('/covid/', getNumber);

module.exports = {
    routes: router
}