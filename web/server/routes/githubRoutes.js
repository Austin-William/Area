const express = require('express');
const { getUserGithub, setAccessToken, setNameFolder } = require('../controllers/githubController');

const router = express.Router();

router.post('/github/:username', getUserGithub);
router.post('/github/connect/:access_token', setAccessToken);
router.post('/github/setNameFolder/:name_folder', setNameFolder);

module.exports = {
    routes: router
}