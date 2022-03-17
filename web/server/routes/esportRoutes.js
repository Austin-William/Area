const express = require('express');
const { getDayMatches, getPastMatches, getTournaments } = require('../controllers/esportController');

const router = express.Router();

router.post('/esport/DayMatches/:game', getDayMatches);
router.post('/esport/PastMatches/:videogame', getPastMatches);
router.post('/esport/Tournaments/:vgame', getTournaments);

module.exports = {
    routes: router
}