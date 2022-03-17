const fetch = require('node-fetch');
require('whatwg-fetch');
URL = require('url').URL;

// Url of the server
const urlServer = "http://localhost:8080";


global.currentUserData = {};

// Get the current reaction type
global.reactionType = '';

// Notification global variables
global.newNotifList = [];
global.userId = "";
global.userEmail = "";

// Timer global variables
global.timeIntervalTwitter = 0;
global.timerUnsplash = 0;
global.timerInterval = 60; // 10 minutes 

///////////////////////// Weather //////////////////////////
global.tempCity = "";
global.weatherCity = "";

///////////////////////// Github //////////////////////////
global.nameFolder = "";
global.accessToken = "";
global.userParamGithub = "";
global.newUserData = {};
global.userData = {};

///////////////////////// Anime //////////////////////////
global.userAnimeUp = "";
global.userMangaUp = "";
global.userAnimeWL = "";
global.userAnimePTW = "";
global.userAnimeST = "";

///////////////////////// Unsplash //////////////////////////
global.fetch = fetch;
global.photoName = "";
global.activateRandomUnsplash = false;

///////////////////////// Twitter //////////////////////////
global.worldTrendsData = {};
global.franceTrendsData = {};
global.trendsDataLocation = {};
global.newWorldTrendsData = {};
global.newFranceTrendsData = {};
global.newTrendsDataLocation = {};
// Global variables for trends by country
global.woeid = "";
// Global variables for trends by location
global.lat = "";
global.long = "";

///////////////////////// Crypto //////////////////////////
global.cryptoName = "";

///////////////////////// Covid //////////////////////////
global.activateCovid = "";

///////////////////////// Esport //////////////////////////
global.Game = "";
global.videoGame = "";
global.vGame = "";

///////////////////////// Football //////////////////////////
global.footStandings = "";
global.footScorers = "";
global.L1PastMatches = "";
global.L1Matches = "";
global.footMatches = "";
global.teamMatches = "";

///////////////////////// News //////////////////////////
global.country = "";
global.subject = "";
global.source = "";

module.exports = {
    urlServer: urlServer,
};