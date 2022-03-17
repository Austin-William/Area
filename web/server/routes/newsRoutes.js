const express = require('express');
const { getNewsbyCountry, getNewsbySubject, getNewsbySource } = require('../controllers/newsController');

const router = express.Router();

router.post('/news/Country/:country', getNewsbyCountry);
router.post('/news/Subject/:subject', getNewsbySubject);
router.post('/news/Source/:source', getNewsbySource);

module.exports = {
    routes: router
}