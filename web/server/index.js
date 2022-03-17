'use strict'

require('./global/variables');

const express = require('express');
const cors = require('cors');
const config = require('./config');
const bodyParser = require('body-parser');
const about = require('./about.json');

// import routes
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes');
const apiWeather = require('./routes/weatherRoutes');
const apiCrypto = require('./routes/cryptoRoutes');
const apiAnime = require('./routes/animeRoutes');
const apiUnsplash = require('./routes/unsplashRoutes');
const apiTwitter = require('./routes/twitterRoutes');
const apiGithub = require('./routes/githubRoutes');
const apiCovid = require('./routes/covidRoutes');
const apiEsport = require('./routes/esportRoutes');
const apiFootball = require('./routes/footballRoutes');
const apiNews = require('./routes/newsRoutes');
const reaction = require('./routes/reactionRoute');

// import controllers
const { setReactionGithub } = require('./controllers/githubController');
const { setReactionUnsplash, setRandomUnsplashPicture } = require('./controllers/unsplashController');
const { setReactionTwitterTrendsWorld, setReactionTwitterTrendsFrance, setReactionTwitterLocation } = require('./controllers/twitterController');
const { setReactionUpdatedAnime } = require('./controllers/animeController');
const { setReactionUpdatedManga } = require('./controllers/animeController');
const { setReactionWatchingList } = require('./controllers/animeController');
const { setReactionPTWIsAiring } = require('./controllers/animeController');
const { setReactionSeasonTop } = require('./controllers/animeController');
const { setReactionTemp } = require('./controllers/weatherController');
const { setReactionWeather } = require('./controllers/weatherController');
const { setReactionCovidNumber } = require('./controllers/covidController');
const { setReactionCrypto } = require('./controllers/cryptoController');
const { setReactionDayMatches } = require('./controllers/esportController');
const { setReactionPastMatches } = require('./controllers/esportController');
const { setReactionTournaments} = require('./controllers/esportController');
const { setReactionStandings} = require('./controllers/footballController');
const { setReactionScorers} = require('./controllers/footballController');
const { setReactionPastL1Matches} = require('./controllers/footballController');
const { setReactionL1Matches} = require('./controllers/footballController');
const { setReactionFootMatches } = require('./controllers/footballController');
const { setReactionTeamMatches } = require('./controllers/footballController');
const { setReactionNewsbyCountry } = require('./controllers/newsController');
const { setReactionNewsbySubject } = require('./controllers/newsController');
const { setReactionNewsbySource } = require('./controllers/newsController');

const app = express();

/* SET SERVER */
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

////////////////
/* ALL ROUTES */
////////////////

// ALL ROUTES FOR THE BACK //
app.use(apiRoutes.routes);

// ALL ROUTES TO CALL WITH API //
app.use('/api', userRoutes.routes);
app.use('/api', apiWeather.routes);
app.use('/api', apiCrypto.routes);
app.use('/api', apiAnime.routes);
app.use('/api', apiUnsplash.routes);
app.use('/api', apiTwitter.routes);
app.use('/api', apiGithub.routes);
app.use('/api', apiCovid.routes);
app.use('/api', apiEsport.routes);
app.use('/api', apiFootball.routes);
app.use('/api', apiNews.routes);
app.use('/api', reaction.routes);

// ROUTES TO TEST BACK ROUTE //
app.get('/test', (req, res) => {
  return res.send("OK");
});

// ROUTES TO GET CONNECTION TO FIREBASE //
app.get('/firebase', (req, res) => {
  return res.json(config.firebaseConfig);
});

// ALL ROUTES FOR ABOUT.JSON //
app.put('/setIP', (req, res) => {
  about.client.host = req.body.ip;
  res.send("IP done");
});
app.get('/about.json', (req, res) => {
  about.server.current_time = Date.now();
  return res.json(about);
});

// Function turning in boucle for automatic reaction and update

setInterval(() => {
  currentUserData.actionsreactions?.map((item, index) => {
    reactionType = item.reaction;

    // =========== WEATHER ===========
    if (item.action === "Weather Temperature") {
      setReactionTemp(index);
    }
    if (item.action === "Weather Description") {
      setReactionWeather(index);
    }

    // =========== ANIME ===========
    if (item.action === "Last Anime Updated") {
      setReactionUpdatedAnime(index);
    }
    if (item.action === "Last Manga Updated") {
      setReactionUpdatedManga(index);
    }
    if (item.action === "Watching Anime is Airing") {
      setReactionWatchingList(index);
    }
    if (item.action === "Episode from Plan to Watch") {
      setReactionPTWIsAiring(index);
    }
    if (item.action === "Current Anime Season Top 10") {
      setReactionSeasonTop(index);
    }

    // =========== CRYPTO ===========
    if (item.action === "Percentage change 24h crypto") {
      setReactionCrypto(index);
    }

    // =========== COVID ===========
    if (item.action === "Covid Number") {
      setReactionCovidNumber(index);
    }

    // =========== ESPORT ===========
    if (item.action === "Day Matches") {
      setReactionDayMatches(index);
    }
    if (item.action === "Past Matches") {
      setReactionPastMatches(index);
    }
    if (item.action === "Tournaments") {
      setReactionTournaments(index);
    }

    // =========== FOOTBALL ===========
    if (item.action === "Football Standings") {
      setReactionStandings(index);
    }
    if (item.action === "Football Scorers") {
      setReactionScorers(index);
    }
    if (item.action === "Last Ligue 1 Scores") {
      setReactionPastL1Matches(index);
    }
    if (item.action === "Ligue 1 Next Day Matches") {
      setReactionL1Matches(index);
    }
    if (item.action === "Football Matches") {
      setReactionFootMatches(index);
    }
    if (item.action === "Team Matches") {
      setReactionTeamMatches(index);
    }

    // =========== NEWS ===========
    if (item.action === "News by Country") {
      setReactionNewsbyCountry(index);
    }
    if (item.action === "News by Subject") {
      setReactionNewsbySubject(index);
    }
    if (item.action === "News by Source") {
      setReactionNewsbySource(index);
    }

    // =========== GITHUB ===========
    if (item.action === "Search user") {
      setReactionGithub(index);
    }

    // =========== TWITTER ===========
    if (item.action === "Top trends by location") {
      setReactionTwitterLocation(index);
    }
    if (item.action === "Top trends world") {
      setReactionTwitterTrendsWorld(index);
    }
    if (item.action === "Top trends France") {
      setReactionTwitterTrendsFrance(index);
    }

    // =========== UNSPASH ===========
    if (item.action === "Random photo") {
     setRandomUnsplashPicture(index);
    }
  }
)}, `${timerInterval}00`);

/* START SERVER */
app.listen(config.port, () => console.log("App is listening on " + config.url));