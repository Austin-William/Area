const axios = require('axios');
const { emailController } = require('./emailController');
const { urlServer } = require('../global/variables');

const setReactionStandings = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "football" } })
            .then(data => {
                const api = {
                    base: data.data.base,
                    token: data.data.token
                }
                axios.get(api.base + `competitions/2015/standings`, {
                    headers: {
                        'X-Auth-Token': api.token
                    }
                })
                    .then(result => {
                        const league = result.data;
                        var size = 0;
                        var id = "This is the L1 Standings after the ";
                        var isThereStandings = false;

                        for (var i = 0; i <= 20; i++) {
                            if (league.standings[0].table[i] != null) {
                                size += 1;
                            }
                        }

                        id = id + league.season.currentMatchday + " Played Day: ";

                        for (var j = 0; j < size; j++) {
                            if (league.standings[0].table[j] != null) {
                                var id = id + ' ' + (j + 1) + '. ' + league.standings[0].table[j].team.name + ' (' + league.standings[0].table[j].points + 'pts)' + ' -----';
                                isThereStandings = true;
                            }
                        }
                        if (currentUserData.actionsreactions[index].response != id) {
                            console.log("Football standings have changed");
                            let newResponse = currentUserData.actionsreactions;
                            newResponse[index].response = id;
                            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                "actionsreactions": newResponse
                            });
                            if (reactionType === "email" && isThereStandings === true) {
                                emailController("Football", id);
                            }
                            if (reactionType === "notification" && isThereStandings === true) {
                                newNotifList.push(id);
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                            if (reactionType === "notification" && isThereStandings === false) {
                                newNotifList.push("There is no standings...");
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                        }
                    }).catch(error => {
                        console.log(error.message);
                    });
            }).catch(error => {
                console.log(error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
}

const getStandings = async (req, res, next) => {
    try {
        footStandings = !footStandings;
        res.json({
            message: "Football Ligue 1 Standings is set"
        });
    } catch (error) {
        res.json({
            message: "Football Ligue 1 Standings is not set"
        });
        console.log(error);
    }
}

const setReactionScorers = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "football" } })
            .then(data => {
                const api = {
                    base: data.data.base,
                    token: data.data.token
                }
                axios.get(api.base + `competitions/2015/scorers`, {
                    headers: {
                        'X-Auth-Token': api.token
                    }
                })
                    .then(result => {
                        const league = result.data;
                        var size = 0;
                        var id = "This is the Ligue 1 Scorers Ranking after the ";
                        var isThereStandings = false;

                        for (var i = 0; i <= 20; i++) {
                            if (league.scorers[i] != null) {
                                size += 1;
                            }
                        }

                        id = id + league.season.currentMatchday + " Played Day: ";

                        for (var j = 0; j < size; j++) {
                            if (league.scorers[j] != null) {
                                var id = id + ' ' + (j + 1) + '. ' + league.scorers[j].player.name + ' (' + league.scorers[j].team.name + ') ' + league.scorers[j].numberOfGoals + ' goals' + ' -----';
                                isThereStandings = true;
                            }
                        }
                        if (currentUserData.actionsreactions[index].response != id) {
                            console.log("Football scores have changed");
                            let newResponse = currentUserData.actionsreactions;
                            newResponse[index].response = id;
                            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                "actionsreactions": newResponse
                            });
                            if (reactionType === "email" && isThereStandings === true) {
                                emailController("Football", id);
                            }
                            if (reactionType === "notification" && isThereStandings === true) {
                                newNotifList.push(id);
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                            if (reactionType === "notification" && isThereStandings === false) {
                                newNotifList.push("There is no scorers ranking...");
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                        }
                    }).catch(error => {
                        console.log(error.message);
                    });
            }).catch(error => {
                console.log(error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
}

const getScorers = async (req, res, next) => {
    try {
        footScorers = !footScorers;
        res.json({
            message: "Football Ligue 1 Scorers Ranking is set"
        });
    } catch (error) {
        res.json({
            message: "Football Ligue 1 Scorer Ranking is not set"
        });
        console.log(error);
    }
}

const setReactionPastL1Matches = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "football" } })
            .then(data => {
                const api = {
                    base: data.data.base,
                    token: data.data.token
                }
                axios.get(api.base + `competitions/2015`, {
                    headers: {
                        'X-Auth-Token': api.token
                    }
                })
                    .then(result => {
                        const league = result.data;
                        axios.get(api.base + `competitions/2015/matches?matchday=` + (league.currentSeason.currentMatchday - 1), {
                            headers: {
                                'X-Auth-Token': api.token
                            }
                        })
                            .then(result => {
                                const day = result.data;
                                var size = 0;
                                var id = "This is the L1 results for the ";
                                var isThereMatches = false;

                                for (var i = 0; i <= 10; i++) {
                                    if (day.matches[i] != null) {
                                        size += 1;
                                    }
                                }

                                id = id + day.filters.matchday + " Played Day: ";

                                for (var j = 0; j < size; j++) {
                                    if (day.matches[j] != null) {
                                        var id = id + ' ' + day.matches[j].homeTeam.name + ' ' + day.matches[j].score.fullTime.homeTeam + '-' + day.matches[j].score.fullTime.awayTeam + ' ' + day.matches[j].awayTeam.name + ' -----';
                                        isThereMatches = true;
                                    }
                                }
                                if (currentUserData.actionsreactions[index].response != id) {
                                    console.log("Past scores have changed");
                                    let newResponse = currentUserData.actionsreactions;
                                    newResponse[index].response = id;
                                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                        "actionsreactions": newResponse
                                    });
                                    if (reactionType === "email" && isThereMatches === true) {
                                        emailController("Football", id);
                                    }
                                    if (reactionType === "notification" && isThereMatches === true) {
                                        newNotifList.push(id);
                                        axios.put(urlServer + '/api/user/' + userId, {
                                            "notifications": newNotifList
                                        });
                                    }
                                    if (reactionType === "notification" && isThereMatches === false) {
                                        newNotifList.push("There is no match...");
                                        axios.put(urlServer + '/api/user/' + userId, {
                                            "notifications": newNotifList
                                        });
                                    }
                                }
                            })
                    }).catch(error => {
                        console.log(error.message);
                    });
            }).catch(error => {
                console.log(error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
}

const getPastL1Matches = async (req, res, next) => {
    try {
        L1PastMatches = !L1PastMatches;
        res.json({
            message: "Last Ligue 1 Scores is set"
        });
    } catch (error) {
        res.json({
            message: "Last Ligue 1 Scores is not set"
        });
        console.log(error);
    }
}

const setReactionL1Matches = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "football" } })
            .then(data => {
                const api = {
                    base: data.data.base,
                    token: data.data.token
                }
                axios.get(api.base + `competitions/2015`, {
                    headers: {
                        'X-Auth-Token': api.token
                    }
                })
                    .then(result => {
                        const league = result.data;
                        axios.get(api.base + `competitions/2015/matches?matchday=` + league.currentSeason.currentMatchday, {
                            headers: {
                                'X-Auth-Token': api.token
                            }
                        })
                            .then(result => {
                                const day = result.data;
                                var size = 0;
                                var id = "This is the future L1 Matches for the ";
                                var isThereMatches = false;

                                for (var i = 0; i <= 10; i++) {
                                    if (day.matches[i] != null) {
                                        size += 1;
                                    }
                                }

                                id = id + day.filters.matchday + " Played Day: ";

                                for (var j = 0; j < size; j++) {
                                    if (day.matches[j] != null) {
                                        var id = id + ' ' + day.matches[j].homeTeam.name + ' - ' + day.matches[j].awayTeam.name + ' -----';
                                        isThereMatches = true;
                                    }
                                }
                                if (currentUserData.actionsreactions[index].response != id) {
                                    console.log("Future matches have changed");
                                    let newResponse = currentUserData.actionsreactions;
                                    newResponse[index].response = id;
                                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                        "actionsreactions": newResponse
                                    });
                                    if (reactionType === "email" && isThereMatches === true) {
                                        emailController("Football", id);
                                    }
                                    if (reactionType === "notification" && isThereMatches === true) {
                                        newNotifList.push(id);
                                        axios.put(urlServer + '/api/user/' + userId, {
                                            "notifications": newNotifList
                                        });
                                    }
                                    if (reactionType === "notification" && isThereMatches === false) {
                                        newNotifList.push("There is no match...");
                                        axios.put(urlServer + '/api/user/' + userId, {
                                            "notifications": newNotifList
                                        });
                                    }
                                }
                            })
                    }).catch(error => {
                        console.log(error.message);
                    })
            }).catch(error => {
                console.log(error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
}

const getL1Matches = async (req, res, next) => {
    try {
        L1Matches = !L1Matches;
        res.json({
            message: "Ligue 1 Next Day Matches is set"
        });
    } catch (error) {
        res.json({
            message: "Ligue 1 Next Day Matches is not set"
        });
        console.log(error);
    }
}

const setReactionFootMatches = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "football" } })
            .then(data => {
                const api = {
                    base: data.data.base,
                    token: data.data.token
                }
                axios.get(api.base + `matches?status=SCHEDULED`, {
                    headers: {
                        'X-Auth-Token': api.token
                    }
                })
                    .then(result => {
                        const foot = result.data;
                        var size = 0;
                        var id = "There are the today football matches: ";
                        var isThereMatch = false;

                        for (var i = 0; i <= 50; i++) {
                            if (foot.matches[i] != null) {
                                size += 1;
                            }
                        }

                        for (var j = 0; j < size; j++) {
                            if (foot.matches[j] != null) {
                                var id = id + ' ' + foot.matches[j].competition.name + ': ' + foot.matches[j].homeTeam.name + ' vs ' + foot.matches[j].awayTeam.name + ' at ' + foot.matches[j].utcDate + ' -----';
                                isThereMatch = true;
                            }
                        }
                        if (currentUserData.actionsreactions[index].response != id) {
                            console.log("Today matches have changed");
                            let newResponse = currentUserData.actionsreactions;
                            newResponse[index].response = id;
                            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                "actionsreactions": newResponse
                            });
                            if (reactionType === "email" && isThereMatch === true) {
                                emailController("Football", id);
                            }
                            if (reactionType === "notification" && isThereMatch === true) {
                                newNotifList.push(id);
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                            if (reactionType === "notification" && isThereMatch === false) {
                                newNotifList.push("There is no match...");
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                        }
                    }).catch(error => {
                        console.log(error.message);
                    });
            })
    } catch (error) {
        console.log(error.message);
    }
}

const getFootMatches = async (req, res, next) => {
    try {
        footMatches = !footMatches;
        res.json({
            message: "Day Football Matches is set"
        });
    } catch (error) {
        res.json({
            message: "Day Football Matches is not set"
        });
        console.log(error);
    }
}

const setReactionTeamMatches = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "football" } })
            .then(data => {
                const api = {
                    base: data.data.base,
                    token: data.data.token
                }
                var footballTeam = 0;
                if (currentUserData.actionsreactions[index].actionInput == 'OM' || currentUserData.actionsreactions[index].actionInput == 'om' || currentUserData.actionsreactions[index].actionInput == 'Marseille' || currentUserData.actionsreactions[index].actionInput == 'marseille' || currentUserData.actionsreactions[index].actionInput == 'Olympique de Marseille' || currentUserData.actionsreactions[index].actionInput == 'MARSEILLE' || currentUserData.actionsreactions[index].actionInput == 'olympique de marseille' || currentUserData.actionsreactions[index].actionInput == 'OLYMPIQUE DE MARSEILLE') {
                    var footballTeam = 516;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'PSG' || currentUserData.actionsreactions[index].actionInput == 'psg' || currentUserData.actionsreactions[index].actionInput == 'Paris' || currentUserData.actionsreactions[index].actionInput == 'paris' || currentUserData.actionsreactions[index].actionInput == 'Paris Saint-Germain' || currentUserData.actionsreactions[index].actionInput == 'PARIS SAINT-GERMAIN' || currentUserData.actionsreactions[index].actionInput == 'paris saint germain') {
                    var footballTeam = 524;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'OGCN' || currentUserData.actionsreactions[index].actionInput == 'ogcn' || currentUserData.actionsreactions[index].actionInput == 'Nice' || currentUserData.actionsreactions[index].actionInput == 'nice' || currentUserData.actionsreactions[index].actionInput == 'OGC Nice' || currentUserData.actionsreactions[index].actionInput == 'OGC NICE' || currentUserData.actionsreactions[index].actionInput == 'ogc nice') {
                    var footballTeam = 522;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'SRFC' || currentUserData.actionsreactions[index].actionInput == 'srfc' || currentUserData.actionsreactions[index].actionInput == 'Rennes' || currentUserData.actionsreactions[index].actionInput == 'rennes' || currentUserData.actionsreactions[index].actionInput == 'Stade Rennais FC' || currentUserData.actionsreactions[index].actionInput == 'stade rennais' || currentUserData.actionsreactions[index].actionInput == 'Stade Rennais') {
                    var footballTeam = 529;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'RCSA' || currentUserData.actionsreactions[index].actionInput == 'rcsa' || currentUserData.actionsreactions[index].actionInput == 'Strasbourg' || currentUserData.actionsreactions[index].actionInput == 'strasbourg' || currentUserData.actionsreactions[index].actionInput == 'STRASBOURG' || currentUserData.actionsreactions[index].actionInput == 'RC Strasbourg Alsace' || currentUserData.actionsreactions[index].actionInput == 'rc strasbourg alsace') {
                    var footballTeam = 576;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'RCL' || currentUserData.actionsreactions[index].actionInput == 'rcl' || currentUserData.actionsreactions[index].actionInput == 'Lens' || currentUserData.actionsreactions[index].actionInput == 'lens' || currentUserData.actionsreactions[index].actionInput == 'Racing Club de Lens' || currentUserData.actionsreactions[index].actionInput == 'RC Lens' || currentUserData.actionsreactions[index].actionInput == 'rc lens') {
                    var footballTeam = 546;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'FCN' || currentUserData.actionsreactions[index].actionInput == 'fcn' || currentUserData.actionsreactions[index].actionInput == 'Nantes' || currentUserData.actionsreactions[index].actionInput == 'nantes' || currentUserData.actionsreactions[index].actionInput == 'FC Nantes' || currentUserData.actionsreactions[index].actionInput == 'fc nantes' || currentUserData.actionsreactions[index].actionInput == 'FC NANTES') {
                    var footballTeam = 543;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'LOSC' || currentUserData.actionsreactions[index].actionInput == 'losc' || currentUserData.actionsreactions[index].actionInput == 'Lille' || currentUserData.actionsreactions[index].actionInput == 'lille' || currentUserData.actionsreactions[index].actionInput == 'Lille OSC' || currentUserData.actionsreactions[index].actionInput == 'lille osc' || currentUserData.actionsreactions[index].actionInput == 'LILLE') {
                    var footballTeam = 521;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'ASM' || currentUserData.actionsreactions[index].actionInput == 'asm' || currentUserData.actionsreactions[index].actionInput == 'Monaco' || currentUserData.actionsreactions[index].actionInput == 'monaco' || currentUserData.actionsreactions[index].actionInput == 'AS Monaco' || currentUserData.actionsreactions[index].actionInput == 'as monaco' || currentUserData.actionsreactions[index].actionInput == 'AS MONACO') {
                    var footballTeam = 548;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'OL' || currentUserData.actionsreactions[index].actionInput == 'ol' || currentUserData.actionsreactions[index].actionInput == 'Lyon' || currentUserData.actionsreactions[index].actionInput == 'lyon' || currentUserData.actionsreactions[index].actionInput == 'Olympique Lyonnais' || currentUserData.actionsreactions[index].actionInput == 'olympique lyonnais' || currentUserData.actionsreactions[index].actionInput == 'LYON') {
                    var footballTeam = 523;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'MHSC' || currentUserData.actionsreactions[index].actionInput == 'mhsc' || currentUserData.actionsreactions[index].actionInput == 'Montpellier' || currentUserData.actionsreactions[index].actionInput == 'montpellier' || currentUserData.actionsreactions[index].actionInput == 'Montpellier HSC' || currentUserData.actionsreactions[index].actionInput == 'montpellier hsc' || currentUserData.actionsreactions[index].actionInput == 'MONTPELLIER') {
                    var footballTeam = 518;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'SB29' || currentUserData.actionsreactions[index].actionInput == 'sb29' || currentUserData.actionsreactions[index].actionInput == 'Brest' || currentUserData.actionsreactions[index].actionInput == 'brest' || currentUserData.actionsreactions[index].actionInput == 'Stade Brestois' || currentUserData.actionsreactions[index].actionInput == 'stade brestois' || currentUserData.actionsreactions[index].actionInput == 'BREST') {
                    var footballTeam = 512;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'SDR' || currentUserData.actionsreactions[index].actionInput == 'sdr' || currentUserData.actionsreactions[index].actionInput == 'Reims' || currentUserData.actionsreactions[index].actionInput == 'reims' || currentUserData.actionsreactions[index].actionInput == 'Stade de Reims' || currentUserData.actionsreactions[index].actionInput == 'stade de reims' || currentUserData.actionsreactions[index].actionInput == 'SdR') {
                    var footballTeam = 547;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'SCO' || currentUserData.actionsreactions[index].actionInput == 'sco' || currentUserData.actionsreactions[index].actionInput == 'Angers' || currentUserData.actionsreactions[index].actionInput == 'Angers SCI' || currentUserData.actionsreactions[index].actionInput == 'angers' || currentUserData.actionsreactions[index].actionInput == 'angers sco' || currentUserData.actionsreactions[index].actionInput == 'ANGERS') {
                    var footballTeam = 532;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'CF63' || currentUserData.actionsreactions[index].actionInput == 'cf63' || currentUserData.actionsreactions[index].actionInput == 'Clermont' || currentUserData.actionsreactions[index].actionInput == 'Clermont Foot' || currentUserData.actionsreactions[index].actionInput == 'Clermont Foot 63' || currentUserData.actionsreactions[index].actionInput == 'clermont' || currentUserData.actionsreactions[index].actionInput == 'clermont foot') {
                    var footballTeam = 541;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'FCL' || currentUserData.actionsreactions[index].actionInput == 'fcl' || currentUserData.actionsreactions[index].actionInput == 'Lorient' || currentUserData.actionsreactions[index].actionInput == 'lorient' || currentUserData.actionsreactions[index].actionInput == 'FC Lorient' || currentUserData.actionsreactions[index].actionInput == 'fc lorient' || currentUserData.actionsreactions[index].actionInput == 'FC LORIENT') {
                    var footballTeam = 525;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'ESTAC' || currentUserData.actionsreactions[index].actionInput == 'estac' || currentUserData.actionsreactions[index].actionInput == 'Troyes' || currentUserData.actionsreactions[index].actionInput == 'troyes' || currentUserData.actionsreactions[index].actionInput == 'ESTAC Troyes' || currentUserData.actionsreactions[index].actionInput == 'estac troyes' || currentUserData.actionsreactions[index].actionInput == 'Troyes ESTAC') {
                    var footballTeam = 531;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'FCM' || currentUserData.actionsreactions[index].actionInput == 'fcm' || currentUserData.actionsreactions[index].actionInput == 'Metz' || currentUserData.actionsreactions[index].actionInput == 'FC Metz' || currentUserData.actionsreactions[index].actionInput == 'metz' || currentUserData.actionsreactions[index].actionInput == 'fc metz' || currentUserData.actionsreactions[index].actionInput == 'FC METZ') {
                    var footballTeam = 545;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'ASSE' || currentUserData.actionsreactions[index].actionInput == 'asse' || currentUserData.actionsreactions[index].actionInput == 'Saint-Etienne' || currentUserData.actionsreactions[index].actionInput == 'Saint Etienne' || currentUserData.actionsreactions[index].actionInput == 'AS Saint-Etienne' || currentUserData.actionsreactions[index].actionInput == 'saint etienne' || currentUserData.actionsreactions[index].actionInput == 'saint-etienne') {
                    var footballTeam = 527;
                }
                if (currentUserData.actionsreactions[index].actionInput == 'FCGB' || currentUserData.actionsreactions[index].actionInput == 'fcgb' || currentUserData.actionsreactions[index].actionInput == 'Bordeaux' || currentUserData.actionsreactions[index].actionInput == 'FC Girondins de Bordeaux' || currentUserData.actionsreactions[index].actionInput == 'bordeaux' || currentUserData.actionsreactions[index].actionInput == 'FCG Bordeaux' || currentUserData.actionsreactions[index].actionInput == 'Girondiens de Bordeaux') {
                    var footballTeam = 526;
                }
                axios.get(api.base + `teams/` + footballTeam + `/matches?status=SCHEDULED`, {
                    headers: {
                        'X-Auth-Token': api.token
                    }
                })
                    .then(result => {
                        const foot = result.data;
                        var size = 0;
                        var id = "Futures Matches of " + currentUserData.actionsreactions[index].actionInput + ': ';
                        var isThereMatch = false;

                        for (var i = 0; i <= 50; i++) {
                            if (foot.matches[i] != null) {
                                size += 1;
                            }
                        }

                        for (var j = 0; j < size; j++) {
                            if (foot.matches[j] != null) {
                                var id = id + ' ' + foot.matches[j].competition.name + ': ' + foot.matches[j].homeTeam.name + ' vs ' + foot.matches[j].awayTeam.name + ' at ' + foot.matches[j].utcDate + ' -----';
                                isThereMatch = true;
                            }
                        }
                        if (currentUserData.actionsreactions[index].response != id) {
                            console.log("Today matches have changed");
                            let newResponse = currentUserData.actionsreactions;
                            newResponse[index].response = id;
                            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                "actionsreactions": newResponse
                            });
                            if (reactionType === "email" && isThereMatch === true) {
                                emailController("Football", id);
                            }
                            if (reactionType === "notification" && isThereMatch === true) {
                                newNotifList.push(id);
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                            if (reactionType === "notification" && isThereMatch === false) {
                                newNotifList.push("There is no match...");
                                axios.put(urlServer + '/api/user/' + userId, {
                                    "notifications": newNotifList
                                });
                            }
                        }
                    }).catch(error => {
                        console.log(error.message);
                    });
            }).catch(error => {
                console.log(error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
}

const getTeamMatches= async (req, res, next) => {
    try {
        teamMatches = req.params.team;
        if (teamMatches !== "") {
            res.json({
                message: "Team Football Matches are set"
            });
        } else {
            res.json({
                message: "Team Football Matches are not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getStandings,
    getScorers,
    getPastL1Matches,
    getL1Matches,
    getFootMatches,
    getTeamMatches,
    setReactionStandings,
    setReactionScorers,
    setReactionPastL1Matches,
    setReactionL1Matches,
    setReactionFootMatches,
    setReactionTeamMatches
}