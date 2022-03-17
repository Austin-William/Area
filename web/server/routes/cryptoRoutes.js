const express = require('express');
const { getCrypto } = require('../controllers/cryptoController');

const router = express.Router();

router.post('/crypto/:name', getCrypto);

module.exports = {
    routes: router
}