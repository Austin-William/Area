const express = require('express');
const { getStandings, getFootMatches, getTeamMatches, getScorers, getPastL1Matches, getL1Matches } = require('../controllers/footballController');

const router = express.Router();

router.post('/football/Standings/', getStandings);
router.post('/football/Scorers/', getScorers);
router.post('/football/PastL1Matches/', getPastL1Matches);
router.post('/football/L1Matches/', getL1Matches);
router.post('/football/Matches/', getFootMatches);
router.post('/football/Team/:team', getTeamMatches);

module.exports = {
    routes: router
}