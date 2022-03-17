const axios = require('axios');
const { emailController } = require('./emailController');
const { urlServer } = require('../global/variables');
// //const firebase = require('../db/firebase');
// //const firestore = firebase.firestore();

const setReactionCrypto = async (index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "coingecko" } })
            .then(data => {
                const api = {
                    base: data.data.base
                }
                axios.get(`${api.base}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false`)
                    .then(result => {
                        const crypto = result.data;
                        const filteredCoins = crypto.filter(coin =>
                            coin.name.toLowerCase().includes(currentUserData.actionsreactions[index].actionInput.toLowerCase())
                        )
                        if (currentUserData.actionsreactions[index].response != filteredCoins[0].price_change_percentage_24h.toFixed(2)) {
                            console.log("The crypto percentage 24h have changed");
                            let newResponse = currentUserData.actionsreactions;
                            newResponse[index].response = filteredCoins[0].price_change_percentage_24h.toFixed(2);
                            axios.put(urlServer + '/api/user/' + currentUserData.id, {
                                "actionsreactions": newResponse
                            });
                            if (reactionType === "email") {
                                emailController("Crypto", "The rate of " + currentUserData.actionsreactions[index].actionInput + " is now at " + (filteredCoins[0].price_change_percentage_24h).toFixed(2) + "%");
                            }
                            if (reactionType === "notification") {
                                newNotifList.push("The rate of " + currentUserData.actionsreactions[index].actionInput + " is now at " + (filteredCoins[0].price_change_percentage_24h).toFixed(2) + "%");
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

const getCrypto = async (req, res, next) => {
    try {
        cryptoName = req.params.id;
        if (cryptoName !== "") {
            res.json({
                message: "Crypto is set"
            });
        } else {
            res.json({
                message: "Crypto is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getCrypto,
    setReactionCrypto
}