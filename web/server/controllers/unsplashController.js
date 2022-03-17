const axios = require('axios');
const { emailController } = require('./emailController');
const { getNameCreateFolder } = require('./githubController');
const { urlServer } = require('../global/variables');

// reactionType is stored in /global/variable.js

const setReactionUnsplash = async () => {
    if (photoName !== "" ) {
        try {
            await axios(urlServer + '/apis', { params: { name: "unsplash" } })
                .then(data => {
                    const api = {
                        accessKey: data.data.key
                    }
                    axios.get('https://api.unsplash.com/search/photos', {
                        params: {
                            query: photoName,
                            client_id: api.accessKey,
                            page: Math.floor(Math.random() * 10) + 1,
                            per_page: 1
                        }
                    })
                        .then(result => {
                            const picture = result.data.results[0];
                            if (reactionType === "email") {
                                emailController("Unsplash", picture.links.html);
                            }
                            if (reactionType === "notification") {
                                newNotifList.push(picture.links.html);
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                            if (reactionType === "repo") {
                                nameFolder = picture.id;
                                getNameCreateFolder();
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }).catch (error => {
                    console.log(error.message);
                });
        } catch (error) {
            console.log(error);
        }
    }
}

const getUnsplashPicture = async (req, res, next) => {
    try {
        photoName = req.params.photo;
        if (photoName !== "") {
            res.json({
                message: "Photo name is set"
            });
        } else {
            res.json({
                message: "Photo name is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setRandomUnsplashPicture = async (index) => {
    if (reactionType !== "") {
        try {
            await axios(urlServer + '/apis', { params: { name: "unsplash" } })
                .then(data => {
                    const api = {
                        accessKey: data.data.key
                    }
                    axios.get('https://api.unsplash.com/photos/random', {
                        params: {
                            client_id: api.accessKey,
                            sig: Math.random() // Doesn't matter, just to fix unsplash's error sending same picture
                        }
                    })
                        .then(result => {
                            const picture = result.data;
                            if (currentUserData.actionsreactions[index].response != picture.links.html) {
                                console.log("Random Unsplash picture have changed");
                                let newResponse = currentUserData.actionsreactions;
                                newResponse[index].response = picture.links.html;
                                axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                    "actionsreactions": newResponse
                                });
                                if (reactionType === "email") {
                                    emailController("Unsplash", picture.links.html);
                                }
                                if (reactionType === "notification") {
                                    newNotifList.push(picture.links.html);
                                    axios.put(urlServer + '/api/user/' + userId, {
                                        "notifications": newNotifList
                                    });
                                }
                                if (reactionType === "repo") {
                                    nameFolder = picture.id;
                                    getNameCreateFolder();
                                }
                            }
                        }).catch (error => {
                            console.log(error.message);
                        });
                },
                ).catch (error => {
                    console.log(error.message);
                });
        } catch (error) {
            console.log(error);
        }
    }
}

const getRandomUnsplashPicture = async (req,res, next) => {
    try {
        res.json({
            message: "Random Unsplash picture is set"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setTimerUnsplash = (req, res, next) => {
    unsplashTimer = req.params.timer;
    res.status(200).json({
        message: `Timer set to ${unsplashTimer}`
    });
    setInterval(getRandomUnsplashPicture, unsplashTimer * 1000);
}

module.exports = {
    getRandomUnsplashPicture,
    setRandomUnsplashPicture,
    setTimerUnsplash,
    getUnsplashPicture,
    setReactionUnsplash
}