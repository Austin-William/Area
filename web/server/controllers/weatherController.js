const axios = require('axios');
const { emailController } = require('./emailController');
const { urlServer } = require('../global/variables');

const setReactionTemp = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "weather" } })
            .then(data => {
                return {
                    key: data.data.key,
                    base: data.data.base
                }
            })
        axios.get(`${api.base}weather?q=${currentUserData.actionsreactions[index].actionInput}&units=metric&APPID=${api.key}`)
            .then(result => {
                const weather = result.data;
                if (Math.round(currentUserData.actionsreactions[index].response) != Math.round(weather.main.temp)) {
                    console.log("The temperature have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = weather.main.temp;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email") {
                        emailController("Weather", "The Temperature in " + currentUserData.actionsreactions[index].actionInput + " is " + Math.round(weather.main.temp) + "°C");
                    }
                    if (reactionType === "notification") {
                        newNotifList.push("The Temperature in " + currentUserData.actionsreactions[index].actionInput + " is " + Math.round(weather.main.temp) + "°C");
                        axios.put(urlServer + '/api/user/' + userId, {
                            "notifications": newNotifList
                        });
                    }
                }
            }).catch (error => {
                console.log(error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
}

const getTemp = async (req, res, next) => {
    try {
        tempCity = req.params.town;
        if (tempCity !== "") {
            res.json({
                message: "City Temperature is set"
            });
        } else {
            res.json({
                message: "City Temperature is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setReactionWeather = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "weather" } })
            .then(data => {
                const api = {
                    key: data.data.key,
                    base: data.data.base
                }
                axios.get(`${api.base}weather?q=${currentUserData.actionsreactions[index].actionInput}&units=metric&APPID=${api.key}`)
                    .then(result => {
                        const weather = result.data;
                        if (currentUserData.actionsreactions[index].response != weather.weather[0].main) {
                            console.log("The Temperature description have changed");
                            let newResponse = currentUserData.actionsreactions;
                            newResponse[index].response = weather.weather[0].main;
                            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                "actionsreactions": newResponse
                            });
                            if (reactionType === "email") {
                                emailController("Weather", "The Weather in " + currentUserData.actionsreactions[index].actionInput + " is " + weather.weather[0].main);
                            }
                            if (reactionType === "notification") {
                                newNotifList.push("The Weather in " + currentUserData.actionsreactions[index].actionInput + " is " + weather.weather[0].main);
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                        }
                    }).catch (error => {
                        console.log(error.message);
                    });
            }).catch (error => {
                console.log(error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
}

const getWeather = async (req, res, next) => {
    try {
        weatherCity = req.params.city;
        if (weatherCity !== "") {
            res.json({
                message: "City Weather is set"
            });
        } else {
            res.json({
                message: "City Weather is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getTemp,
    getWeather,
    setReactionTemp,
    setReactionWeather
}