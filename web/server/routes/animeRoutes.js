const express = require('express');
const { getUpdatedAnime, getUpdatedManga, getWatchingList, getPTWIsAiring, getSeasonTop } = require('../controllers/animeController');

const router = express.Router();

router.post('/anime/UpdatedAnime/:name', getUpdatedAnime);
router.post('/anime/UpdatedManga/:manganame', getUpdatedManga);
router.post('/anime/WatchingList/:user', getWatchingList);
router.post('/anime/PTWIsAiring/:maluser', getPTWIsAiring);
router.post('/anime/SeasonTop', getSeasonTop);

module.exports = {
    routes: router
}