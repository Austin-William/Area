const axios = require('axios');
const { emailController } = require('./emailController');
const { urlServer } = require('../global/variables');

const setReactionNewsbyCountry = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "news" } })
            .then(data => {
                return {
                    base: data.data.base,
                    token: data.data.token
                }
            })
        axios.get(api.base + `country=${currentUserData.actionsreactions[index].actionInput}` + api.token, {
        })
            .then(result => {
                const news = result.data.articles;
                var size = 0;
                var id = "These are the " + currentUserData.actionsreactions[index].actionInput + " informations:";
                var isThereinfo = false;

                for (var i = 0; i <= 5; i++) {
                    if (news[i] != null) {
                        size += 1;
                    }
                }
                for (var j = 0; j < size; j++) {
                    if (news[j] != null) {                            
                        var id = id + ' ' + news[j].title + ': ' + news[j].url + ' -----';
                    }
                    isThereinfo = true;
                }
                if (currentUserData.actionsreactions[index].response != id) {
                    console.log("news by contry have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = id;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email" && isThereinfo === true) {
                        emailController("News", id);
                    }
                    if (reactionType === "notification" && isThereinfo === true) {
                        newNotifList.push(id);
                        axios.put(urlServer + '/api/user/' + userId, {
                            "notifications": newNotifList
                        });
                    }
                    if (reactionType === "notification" && isThereinfo === false) {
                        newNotifList.push("There is no " + country + " news today...");
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

const getNewsbyCountry = async (req, res, next) => {
    try {
        country = req.params.country;
        if (country !== "") {
            res.json({
                message: "News by country are set"
            });
        } else {
            res.json({
                message: "News by country are not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setReactionNewsbySubject = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "news" } })
            .then(data => {
                return {
                    base: data.data.base,
                    token: data.data.token
                }
            })
        axios.get(api.base + `q=${currentUserData.actionsreactions[index].actionInput}` + api.token, {
        })
            .then(result => {
                const news = result.data.articles;
                var size = 0;
                var id = "These are the " + currentUserData.actionsreactions[index].actionInput + " informations:";
                var isThereinfo = false;

                for (var i = 0; i <= 5; i++) {
                    if (news[i] != null) {
                        size += 1;
                    }
                }
                for (var j = 0; j < size; j++) {
                    if (news[j] != null) {                            
                        var id = id + ' ' + news[j].title + ': ' + news[j].url + ' -----';
                    }
                    isThereinfo = true;
                }
                if (currentUserData.actionsreactions[index].response != id) {
                    console.log("news by subject have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = id;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email" && isThereinfo === true) {
                        emailController("News", id);
                    }
                    if (reactionType === "notification" && isThereinfo === true) {
                        newNotifList.push(id);
                        axios.put(urlServer + '/api/user/' + userId, {
                            "notifications": newNotifList
                        });
                    }
                    if (reactionType === "notification" && isThereinfo === false) {
                        newNotifList.push("There is no " + subject + " news today...");
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

const getNewsbySubject = async (req, res, next) => {
    try {
        subject = req.params.subject;
        if (subject !== "") {
            res.json({
                message: "News by subject are set"
            });
        } else {
            res.json({
                message: "News by subject are not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setReactionNewsbySource = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "news" } })
            .then(data => {
                return {
                    base: data.data.base,
                    token: data.data.token
                }
            })
        axios.get(api.base + `sources=${currentUserData.actionsreactions[index].actionInput}` + api.token, {
        })
            .then(result => {
                const news = result.data.articles;
                var size = 0;
                var id = "These are the " + currentUserData.actionsreactions[index].actionInput + " informations:";
                var isThereinfo = false;

                for (var i = 0; i <= 5; i++) {
                    if (news[i] != null) {
                        size += 1;
                    }
                }
                for (var j = 0; j < size; j++) {
                    if (news[j] != null) {                            
                        var id = id + ' ' + news[j].title + ': ' + news[j].url + ' -----';
                    }
                    isThereinfo = true;
                }
                if (currentUserData.actionsreactions[index].response != id) {
                    console.log("news by source have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = id;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email" && isThereinfo === true) {
                        emailController("News", id);
                    }
                    if (reactionType === "notification" && isThereinfo === true) {
                        newNotifList.push(id);
                        axios.put(urlServer + '/api/user/' + userId, {
                            "notifications": newNotifList
                        });
                    }
                    if (reactionType === "notification" && isThereinfo === false) {
                        newNotifList.push("There is no " + source + " news today...");
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

const getNewsbySource = async (req, res, next) => {
    try {
        source = req.params.source;
        if (source !== "") {
            res.json({
                message: "News by source are set"
            });
        } else {
            res.json({
                message: "News by source are not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getNewsbyCountry,
    getNewsbySubject,
    getNewsbySource,
    setReactionNewsbyCountry,
    setReactionNewsbySubject,
    setReactionNewsbySource 
}