const express = require('express');
const { getUserSteam } = require('../controllers/steamController');

const router = express.Router();

router.get('/steam/:username', getUserSteam);

module.exports = {
    routes: router
}