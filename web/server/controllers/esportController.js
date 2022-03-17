const axios = require('axios');
const { emailController } = require('./emailController');
const { urlServer } = require('../global/variables');

const setReactionDayMatches = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "pandascore" } })
            .then(data => {
                return {
                    base: data.data.base,
                    token: data.data.token
                }
            })
        axios.get(api.base + `${currentUserData.actionsreactions[index].actionInput}/matches/upcoming?sort=begin_at&page=1&per_page=50`, {
            headers: {
                Authorization: 'Bearer ' + api.token
            }
        })
            .then(result => {
                const match = result.data;
                var size = 0;
                var id = "These matches are airing today :"
                var isThereMatch = false;

                var day = Date().toLocaleString().slice(8, 10);
                var date = Date().toLocaleString().slice(4, 7);
                var year = Date().toLocaleString().slice(11, 15);

                if (date === "Jan") {
                    var month = "01"
                } else if (date === "Feb") {
                    var month = "02"
                } else if (date === "Mar") {
                    var month = "03"
                } else if (date === "Apr") {
                    var month = "04"
                } else if (date === "May") {
                    var month = "05"
                } else if (date === "Jun") {
                    var month = "06"
                } else if (date === "Jul") {
                    var month = "07"
                } else if (date === "Aug") {
                    var month = "08"
                } else if (date === "Sep") {
                    var month = "09"
                } else if (date === "Oct") {
                    var month = "10"
                } else if (date === "Nov") {
                    var month = "11"
                } else if (date === "Dec") {
                    var month = "12"
                }

                for (var i = 0; i <= 50; i++) {
                    if (match[i] != null) {
                        size += 1;
                    }
                }
                for (var j = 0; j < size; j++) {
                    if (match[j] != null && match[j].begin_at.toLocaleString().slice(0, 10) === year + '-' + month + '-' + day) {                            
                        var id = id + "\n" + match[j].slug + ' at ' + match[j].begin_at.toLocaleString().slice(12, 16) + ', here: ' + match[j].official_stream_url + ' -----';
                    }
                    isThereMatch = true;
                }
                if (currentUserData.actionsreactions[index].response != id) {
                    console.log("Day match have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = id;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email" && isThereMatch === true) {
                        emailController("Esport", id);
                    }
                    if (reactionType === "notification" && isThereMatch === true) {
                        newNotifList.push(id);
                        axios.put(urlServer + '/api/user/' + userId, {
                            "notifications": newNotifList
                        });
                    }
                    if (reactionType === "notification" && isThereMatch === false) {
                        newNotifList.push("There is no match airing today...");
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

const getDayMatches = async (req, res, next) => {
    try {
        Game = req.params.game;
        if (Game !== "") {
            res.json({
                message: "Day Matches are set"
            });
        } else {
            res.json({
                message: "Day Matches are not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setReactionPastMatches = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "pandascore" } })
            .then(data => {
                return {
                    base: data.data.base,
                    token: data.data.token
                }
            })
        axios.get(api.base + `${currentUserData.actionsreactions[index].actionInput}/matches/past?status=finished&page=1&per_page=50`, {
            headers: {
                Authorization: 'Bearer ' + api.token
            }
        })
            .then(result => {
                const match = result.data;
                var size = 0;
                var id = "This is the result of today finished Matches :"
                var isThereMatch = false;

                var day = Date().toLocaleString().slice(8, 10);
                var date = Date().toLocaleString().slice(4, 7);
                var year = Date().toLocaleString().slice(11, 15);

                if (date === "Jan") {
                    var month = "01"
                } else if (date === "Feb") {
                    var month = "02"
                } else if (date === "Mar") {
                    var month = "03"
                } else if (date === "Apr") {
                    var month = "04"
                } else if (date === "May") {
                    var month = "05"
                } else if (date === "Jun") {
                    var month = "06"
                } else if (date === "Jul") {
                    var month = "07"
                } else if (date === "Aug") {
                    var month = "08"
                } else if (date === "Sep") {
                    var month = "09"
                } else if (date === "Oct") {
                    var month = "10"
                } else if (date === "Nov") {
                    var month = "11"
                } else if (date === "Dec") {
                    var month = "12"
                }

                for (var i = 0; i <= 50; i++) {
                    if (match[i] != null) {
                        size += 1;
                    }
                }
                
                for (var j = 0; j < size; j++) {
                    if (match[j] != null && match[j].forfeit === true) {
                        var id = id + "\n" + match[j].slug + 'was cancelled' + ' -----';
                    } else if (match[j] != null && match[j].begin_at.toLocaleString().slice(0, 10) === year + '-' + month + '-' + day) {
                        var id = id + "\n" + match[j].slug;
                        if (match[j].winner != null) 
                        var id = id + ', winner was: ' + match[j].winner.name + ' -----';
                        isThereMatch = true;
                    }
                }
                if (currentUserData.actionsreactions[index].response != id) {
                    console.log("Past match have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = id;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email" && isThereMatch === true) {
                        emailController("Esport", id);
                    }
                    if (reactionType === "notification" && isThereMatch === true) {
                        newNotifList.push(id);
                        axios.put(urlServer + '/api/user/' + userId, {
                            "notifications": newNotifList
                        });
                    }
                    if (reactionType === "notification" && isThereMatch === false) {
                        newNotifList.push("There is no match score today...");
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

const getPastMatches = async (req, res, next) => {
    try {
        videoGame = req.params.videogame;
        if (videoGame !== "") {
            res.json({
                message: "Past Matches are set"
            });
        } else {
            res.json({
                message: "Past Matches are not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setReactionTournaments = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "pandascore" } })
            .then(data => {
                return {
                    base: data.data.base,
                    token: data.data.token
                }
            })
        axios.get(api.base + `${currentUserData.actionsreactions[index].actionInput}/tournaments/upcoming?page=1&per_page=50&sort=begin_at`, {
            headers: {
                Authorization: 'Bearer ' + api.token
            }
        })
            .then(result => {
                const tournament = result.data;
                var size = 0;
                var id = "These tournaments are upcoming :"
                var isThereTournament = false;

                for (var i = 0; i <= 50; i++) {
                    if (tournament[i] != null) {
                        size += 1;
                    }
                }
                for (var j = 0; j < size; j++) {
                    if (tournament[j] != null) {                            
                        var id = id + "\n" + tournament[j].league.slug + ' from ' + tournament[j].begin_at + ' to ' + tournament[j].end_at + ' -----';
                        isThereTournament = true;
                    }
                }
                if (currentUserData.actionsreactions[index].response != id) {
                    console.log("Tournaments upcoming have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = id;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email" && isThereTournament === true) {
                        emailController("Esport", id);
                    }
                    if (reactionType === "notification" && isThereTournament === true) {
                        newNotifList.push(id);
                        axios.put(urlServer + '/api/user/' + userId, {
                            "notifications": newNotifList
                        });
                    }
                    if (reactionType === "notification" && isThereTournament === false) {
                        newNotifList.push("There is no tournament upcoming for this game...");
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

const getTournaments = async (req, res, next) => {
    try {
        vGame = req.params.vgame;
        if (vGame !== "") {
            res.json({
                message: "Tournaments are set"
            });
        } else {
            res.json({
                message: "Tournaments are not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getDayMatches,
    getPastMatches,
    getTournaments,
    setReactionDayMatches,
    setReactionPastMatches,
    setReactionTournaments
}