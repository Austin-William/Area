const express = require('express');
const { getApi } = require('../controllers/apiController');

const router = express.Router();

router.get('/apis', getApi);

module.exports = {
    routes: router
}