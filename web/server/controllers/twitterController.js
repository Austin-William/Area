require('../global/variables');
const Twitter = require('twitter');
const axios = require('axios');
const { emailController } = require('./emailController');
const { getNameCreateFolder } = require('./githubController');
const { urlServer } = require('../global/variables');

const setReactionTwitterTrendsWorld = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "twitter" } })
            .then(data => {
                return {
                    key: data.data.key,
                    secret: data.data.secret,
                    access_token: data.data.access_token,
                    token_secret: data.data.token_secret
                }
            })
        const client = new Twitter({
            consumer_key: api.key,
            consumer_secret: api.secret,
            access_token_key: api.access_token,
            access_token_secret: api.token_secret
        });
        const trends = await client.get('trends/place.json', { id: 1 })
            .then(data => {
                worldTrendsData = data[0].trends[0];
                return data[0].trends[0];
            })
            .catch(error => {
                console.log("=== Error Twitter fetching world trends ===");
                console.log(error);
            })
        if (currentUserData.actionsreactions[index].response.name != trends.name) {
            let newResponse = currentUserData.actionsreactions;
            newResponse[index].response = trends;
            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                "actionsreactions": newResponse
            });
            if (reactionType === "email") {
                emailController("Twitter", "New top trends world " + trends.name + " : " + trends.url);
            }
            if (reactionType === "notification") {
                newNotifList.push("New top trends world " + trends.name + " : " + trends.url);
                axios.put(urlServer + '/api/user/' + userId, {
                    "notifications": newNotifList
                });
            }
            if (reactionType === "repo") {
                nameFolder = trends.name;
                getNameCreateFolder();
            }
        }
    } catch (error) {
        console.log("Set Twitter World reaction error : ");
        console.log(error);

    }
}


const setReactionTwitterTrendsFrance = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "twitter" } })
            .then(data => {
                return {
                    key: data.data.key,
                    secret: data.data.secret,
                    access_token: data.data.access_token,
                    token_secret: data.data.token_secret
                }
            })
        const client = new Twitter({
            consumer_key: api.key,
            consumer_secret: api.secret,
            access_token_key: api.access_token,
            access_token_secret: api.token_secret
        });
        const trends = await client.get('trends/place.json', { id: 23424819 })
            .then(data => {
                franceTrendsData = data[0].trends[0];
                return data[0].trends[0];
            })
        if (currentUserData.actionsreactions[index].response.name != trends.name) {
            let newResponse = currentUserData.actionsreactions;
            newResponse[index].response = trends;
            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                "actionsreactions": newResponse
            })
            if (reactionType === "email") {
                emailController("Twitter", "New top trends France" + trends.name + " : " + trends.url);
            }
            if (reactionType === "notification") {
                newNotifList.push("New top trends France " + trends.name + " : " + trends.url);
                axios.put(urlServer + '/api/user/' + userId, {
                    "notifications": newNotifList
                });
            }
            if (reactionType === "repo") {
                nameFolder = trends.name;
                getNameCreateFolder();
            }
        }
    } catch (error) {
        console.log("Set Twitter France reaction error : ");
        console.log(error);
    }
}


const getTwitterTrendsWorld = async (req, res, next) => {
    try {
        res.status(200).send({
            message: "Twitter world trends set",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTwitterTrendsFrance = async (req, res, next) => {
    try {
        res.status(200).send({
            message: "Twitter France trends set",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setReactionTwitterLocation = async (index) => {
    if (lat !== "" && long !== "") {
        try {
            const api = await axios(urlServer + '/apis', { params: { name: "twitter" } })
                .then(data => {
                    return {
                        key: data.data.key,
                        secret: data.data.secret,
                        access_token: data.data.access_token,
                        token_secret: data.data.token_secret
                    }
                })
            const client = new Twitter({
                consumer_key: api.key,
                consumer_secret: api.secret,
                access_token_key: api.access_token,
                access_token_secret: api.token_secret
            });
            try {
                const response = await client.get('/trends/closest.json', { lat, long });
                // Get the woeid of the location
                const woeid = response[0].woeid;
                const trends = await client.get('trends/place.json', { id: woeid });
                if (currentUserData.actionsreactions[index].response != trends) {
                    console.log('New location trends');
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = trends;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email") {
                        emailController("Twitter", trends[0].trends[0].url);
                    }
                    if (reactionType === "notification") {
                        newNotifList.push(trends[0].trends[0].url);
                        axios.put(urlServer + '/api/user/' + userId, {
                            "notifications": newNotifList
                        });
                    }
                    if (reactionType === "repo") {
                        if (nameFolder == "") {
                            nameFolder = trends[0].trends[0].name;
                        }
                        getNameCreateFolder();
                    }
                }
                // Get the trends of the location
            } catch (err) {
                console.log(err);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const getTwitterLocation = async (req, res, next) => {
    try {
        lat = req.params.lat;
        long = req.params.long;
        if (userParamGithub !== "") {
            res.json({
                message: "Latitude and longitude are set"
            });
        } else {
            res.json({
                message: "Latitude and longitude are not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLastTweets = async (req, res, next) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "twitter" } })
            .then(data => {
                return {
                    key: data.data.key,
                    secret: data.data.secret,
                    access_token: data.data.access_token,
                    token_secret: data.data.token_secret
                }
            })
        const client = new Twitter({
            consumer_key: api.key,
            consumer_secret: api.secret,
            access_token_key: api.access_token,
            access_token_secret: api.token_secret
        });
        const lastTweet = client.get('/2/tweets/search/recent',
            {
                q: '#nodejs',
                count: 10,
                result_type: 'recent',
                lang: 'en',
            },
            function (error, tweets, response) {
                if (error) {
                    res.send(error);
                }
                if (tweets) {
                    res.status(200).send(tweets);
                }
                if (response) {
                    res.status(200).send(response);
                }
            });
        if (reactionType === "email") {
            emailController("Twitter", lastTweet.data[0].entities.urls[0].expanded_url);
        }
        else if (reactionType === "notification") {
            fillNotificationList({
                id: req.body.screen_name,
                api: "twitter",
                data: lastTweet.data[0],
                name: "tweets",
                content: "tweets",
                receiver: "tweets"
            });
        }
        else if (reactionType === "repo") {
            nameFolder = lastTweet.data[0].user.name;
            getNameCreateFolder(req, res, next);
        } else {
            res.status(400).send("Reaction type not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTimeIntervalTwitter = async (req, res, next) => {
    try {
        timeIntervalTwitter = req.params.sec;
        res.status(200).send({
            message: "Time interval set to " + timeInterval + " seconds"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const intervalTweet = () => {
    if (timeIntervalTwitter > 0) {
        setInterval(getLastTweets, timeIntervalTwitter * 1000);
        setInterval(getTwitterTrends, timeIntervalTwitter * 1000);
        setInterval(getTwitterLocation, timeIntervalTwitter * 1000);
    }
}

module.exports = {
    getTwitterTrendsWorld,
    getTwitterTrendsFrance,
    getTwitterLocation,
    getLastTweets,
    getTimeIntervalTwitter,
    intervalTweet,
    setReactionTwitterTrendsWorld,
    setReactionTwitterTrendsFrance,
    setReactionTwitterLocation
}