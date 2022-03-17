const axios = require('axios');
const { emailController } = require('./emailController');
const { urlServer } = require('../global/variables');

const setReactionUpdatedAnime = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "my_anime_list_api" } })
            .then(data => {
                return {
                    base: data.data.base_user,
                    token: data.data.token
                }
            })
        axios.get(api.base + `${currentUserData.actionsreactions[index].actionInput}/animelist?limit=1&fields=list_status&sort=list_updated_at`, {
            headers: {
                Authorization: 'Bearer ' + api.token
            }
        })
            .then(result => {
                const anime = result.data.data[0].node.title;
                if (currentUserData.actionsreactions[index].response != anime) {
                    console.log("The last anime update have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = anime;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email") {
                        emailController("Anime", 'This Anime has succesfully been updated: ' + anime);
                    }
                    if (reactionType === "notification") {
                        newNotifList.push('This Anime has succesfully been updated: ' + anime);
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

const getUpdatedAnime = async (req, res, next) => {
    try {
        userAnimeUp = req.params.name;
        if (userAnimeUp !== "") {
            res.json({
                message: "Updated Anime is set"
            });
        } else {
            res.json({
                message: "Updated Anime is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setReactionWatchingList = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "my_anime_list_api" } })
            .then(data => {
                const api = {
                    base: data.data.base_user,
                    token: data.data.token
                }
                axios.get(api.base + `${currentUserData.actionsreactions[index].actionInput}/animelist?limit=100&sort=list_updated_at&status=watching&fields=id,title,status,broadcast`, {
                    headers: {
                        Authorization: 'Bearer ' + api.token
                    }
                })
                    .then(result => {
                        const anime = result.data;
                        var size = 0;
                        var id = "These animes are airing today :"
                        var isThereAnime = false;

                        for (var i = 0; i <= 100; i++) {
                            if (anime.data[i] != null) {
                                size += 1;
                            }
                        }

                        var date = Date().toLocaleString().slice(0, 3);

                        for (var j = 0; j < size; j++) {
                            if (anime.data[j].node.status === "currently_airing" && anime.data[j].node.broadcast != null) {
                                if (date == "Mon" && anime.data[j].node.broadcast.day_of_the_week === "monday"
                                    || date == "Tue" && anime.data[j].node.broadcast.day_of_the_week === "tuesday"
                                    || date == "Wed" && anime.data[j].node.broadcast.day_of_the_week === "wednesday"
                                    || date == "Thu" && anime.data[j].node.broadcast.day_of_the_week === "thursday"
                                    || date == "Fri" && anime.data[j].node.broadcast.day_of_the_week === "friday"
                                    || date == "Sat" && anime.data[j].node.broadcast.day_of_the_week === "saturday"
                                    || date == "Sun" && anime.data[j].node.broadcast.day_of_the_week === "sunday") {
                                    var id = id + "\n" + anime.data[j].node.title;
                                    isThereAnime = true;
                                }
                            }
                        }
                        if (currentUserData.actionsreactions[index].response != id) {
                            console.log("Animes airing today in your watching list have changed");
                            let newResponse = currentUserData.actionsreactions;
                            newResponse[index].response = id;
                            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                "actionsreactions": newResponse
                            });
                            if (reactionType === "email" && isThereAnime === true) {
                                emailController("Anime", id);
                            }
                            if (reactionType === "notification" && isThereAnime === true) {
                                newNotifList.push(id);
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                            if (reactionType === "notification" && isThereAnime === false) {
                                newNotifList.push("There is no anime airing today...");
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

const getWatchingList = async (req, res, next) => {
    try {
        userAnimeWL = req.params.user;
        if (userAnimeWL !== "") {
            res.json({
                message: "Watching List is set"
            });
        } else {
            res.json({
                message: "Watching List is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setReactionPTWIsAiring = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "my_anime_list_api" } })
            .then(data => {
                const api = {
                    base: data.data.base_user,
                    token: data.data.token
                }
                axios.get(api.base + `${currentUserData.actionsreactions[index].actionInput}/animelist?limit=100&sort=list_updated_at&status=plan_to_watch&fields=start_date,status`, {
                    headers: {
                        Authorization: 'Bearer ' + api.token
                    }
                })
                    .then(result => {
                        const anime = result.data;
                        var size = 0;
                        var id = "These animes that you plan to watch are airing this month :"
                        var isThereAnime = false;

                        for (var i = 0; i <= 100; i++) {
                            if (anime.data[i] != null) {
                                size += 1;
                            }
                        }
                        var date = Date().toLocaleString().slice(4, 7);

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

                        for (var j = 0; j < size; j++) {
                            if (anime.data[j].node.status === "not_yet_aired" && anime.data[j].node.start_date != null) {
                                if (anime.data[j].node.start_date.slice(5, 7) === month) {
                                    var id = id + "\n" + anime.data[j].node.title;
                                    isThereAnime = true;
                                }
                            }
                        }
                        if (currentUserData.actionsreactions[index].response != id) {
                            console.log("Animes airing today in your plan to watch list have changed");
                            let newResponse = currentUserData.actionsreactions;
                            newResponse[index].response = id;
                            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                "actionsreactions": newResponse
                            });
                            if (reactionType === "email" && isThereAnime === true) {
                                emailController("Anime", id);
                            }
                            if (reactionType === "notification" && isThereAnime === true) {
                                newNotifList.push(id);
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                            if (reactionType === "notification" && isThereAnime === false) {
                                newNotifList.push("There is no plan to watch anime airing this month...");
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

const getPTWIsAiring = async (req, res, next) => {
    try {
        userAnimePTW = req.params.maluser;
        if (userAnimePTW !== "") {
            res.json({
                message: "Plan to Watch Is Airing is set"
            });
        } else {
            res.json({
                message: "Plan to Watch Is Airing is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const setReactionUpdatedManga = async (index) => {
    try {
        const api = await axios(urlServer + '/apis', { params: { name: "my_anime_list_api" } })
            .then(data => {
                return {
                    base: data.data.base_user,
                    token: data.data.token
                }
            })
        axios.get(api.base + `${currentUserData.actionsreactions[index].actionInput}/mangalist?limit=1&fields=list_status&sort=list_updated_at`, {
            headers: {
                Authorization: 'Bearer ' + api.token
            }
        })
            .then(result => {
                const manga = result.data.data[0].node.title;
                if (currentUserData.actionsreactions[index].response != manga) {
                    console.log("The last anime update have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = manga;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email") {
                        emailController("Anime", 'This Manga has succesfully been updated: ' +  manga);
                    }
                    if (reactionType === "notification") {

                        newNotifList.push('This Manga has succesfully been updated: ' + manga);
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

const getUpdatedManga = async (req, res, next) => {
    try {
        userMangaUp = req.params.manganame;
        if (userMangaUp !== "") {
            res.json({
                message: "Updated Manga is set"
            });
        } else {
            res.json({
                message: "Updated Manga is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setReactionSeasonTop = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "my_anime_list_api" } })
            .then(data => {
                const api = {
                    base: data.data.base_anime,
                    token: data.data.token
                }
                var month = Date().toLocaleString().slice(4, 7);
                var year = Date().toLocaleString().slice(11, 15);

                if (month === "Jan" || month === "Feb" || month === "Mar") {
                    var season = "winter";
                } else if (month === "Apr" || month === "May" || month === "Jun") {
                    var season = "spring";
                } else if (month === "Jul" || month === "Aug" || month === "Sep") {
                    var season = "summer";
                } else if (month === "Oct" || month === "Nov" || month === "Dec") {
                    var season = "fall";
                }

                axios.get(api.base + year + `/` + season + `?limit=10&sort=anime_num_list_users`, {
                    headers: {
                        Authorization: 'Bearer ' + api.token
                    }
                })
                    .then(result => {
                        var top = "A new season starts - Top 10 of " + season + " " + year + " Animes:";

                        for (var j = 0; j < 10; j++) {
                            top = top + "\n" + (j + 1) + ". " + result.data.data[j].node.title;
                        }
                        if (currentUserData.actionsreactions[index].response != top) {
                            console.log("The season top have changed");
                            let newResponse = currentUserData.actionsreactions;
                            newResponse[index].response = top;
                            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                "actionsreactions": newResponse
                            });
                            if (reactionType === "email") {
                                emailController("Anime", top);
                            }
                            if (reactionType === "notification") {
                                newNotifList.push(top);
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

const getSeasonTop = async (req, res, next) => {
    try {
        userAnimeST = !userAnimeST;
        res.json({
            message: "New Season top 10 is set"
        });
    } catch (error) {
        res.json({
            message: "New Season top 10 is not set"
        });
        console.log(error);
    }
}

module.exports = {
    getUpdatedAnime,
    getUpdatedManga,
    getWatchingList,
    getPTWIsAiring,
    getSeasonTop,
    setReactionUpdatedAnime,
    setReactionUpdatedManga,
    setReactionWatchingList,
    setReactionPTWIsAiring,
    setReactionSeasonTop
}