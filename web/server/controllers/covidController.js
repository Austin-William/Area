const axios = require('axios');
const { emailController } = require('./emailController');
const { urlServer } = require('../global/variables');

const setReactionCovidNumber = async(index) => {
    try {
        await axios(urlServer + '/apis', { params: { name: "covid" }})
        .then(data => {
            const api = {
                base: data.data.base
            }
            axios.get(`${api.base}`)
            .then(result => {
                const number = result.data;
                if (currentUserData.actionsreactions[index].response != number.France.All.confirmed) {
                    console.log("The number of people infected by Covid in France have changed");
                    let newResponse = currentUserData.actionsreactions;
                    newResponse[index].response = number.France.All.confirmed;
                    axios.put(urlServer + '/api/user/' + currentUserData.id, {
                        "actionsreactions": newResponse
                    });
                    if (reactionType === "email") {
                        emailController("Covid Number", "Number of people infected by Covid in France: " + number.France.All.confirmed);
                    }
                    if (reactionType === "notification") {
                        newNotifList.push("Number of people infected by Covid in France: " + number.France.All.confirmed);
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

const getNumber = async (req, res, next) => {
    try {
        activateCovid = !activateCovid;
        res.json({
            message: "Covid Number is set"
        });
    } catch (error) {
        res.json({
            message: "Covid Number is not set"
        });
        console.log(error);
    }
}

module.exports = {
    getNumber,
    setReactionCovidNumber
}