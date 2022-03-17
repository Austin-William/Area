require('../global/variables');
const axios = require('axios');
const { emailController } = require('./emailController');
const { urlServer } = require('../global/variables');

// reactionType is stored in /global/variable.js

var state = false;
var activateRepoName = false;
// Function should be called in the boucle
const setReactionGithub = async (index) => {
    try {
        console.log(currentUserData.actionsreactions[index].actionInput);
        const response = await axios.get('https://api.github.com/users/' + currentUserData.actionsreactions[index].actionInput)
            .then(response => {
                userData = response.data;
                return response.data;
            })
        if (newUserData === {} || newUserData.public_repos !== userData.public_repos || newUserData.followers !== userData.followers || newUserData.following !== userData.following) {
            newUserData = userData;
            state = true;
            console.log("New user data is set");
        }
        if (state === true) {
            if (reactionType === "email") {
                emailController("Github", response.name + " has updated his profile");
            }
            if (reactionType === "notification") {
                newNotifList.push(response.name + " has updated his profile");
                axios.put(urlServer + '/api/user/' + userId, {
                    "notifications": newNotifList
                });
            }
            if (reactionType === "repo") {
                if (activateRepoName === true) {
                    nameFolder = nameFolder;
                    console.log("Name folder is activated : " + nameFolder);
                } else {
                    nameFolder = response.name;
                }
                getNameCreateFolder();
            }
            state = false;
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Get the username from the client
const getUserGithub = async (req, res, next) => {
    try {
        userParamGithub = req.params.username;
        if (userParamGithub !== "") {
            res.json({
                message: "User is set"
            });
        } else {
            res.json({
                message: "User is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Function to set the folder's name
const setNameFolder = async (req, res, next) => {
    try {
        nameFolder = req.params.name_folder;
        activateRepoName = !activateRepoName;
        res.json({
            message: "Name folder is set"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Function to create the folder in Github
const getNameCreateFolder = async () => {
    try {
        if (accessToken === "") {
            throw new Error("Access Token is not set");
        } else {
            if (nameFolder !== "") {
                console.log(accessToken);
                console.log(nameFolder);
                axios.post('https://api.github.com/user/repos', {
                    name: "AREA_" + nameFolder,
                    description: "Repo created with AREA",
                    private: true
                }, {
                    headers: {
                        Authorization: 'token ' + accessToken
                    }
                })
                    .then(() => {
                        console.log('Repo created');
                    })
                    .catch(error => {
                        console.log("Error Github repo : " + error.message);
                    });
            }
            else {
                throw new Error("Name folder is empty");
            }
        }
    } catch (error) {
        console.log("Github try catch erro : " + error.message);
    }
}

// Add teh access token to the global variable
const setAccessToken = async (req, res, next) => {
    try {
        accessToken = req.params.access_token;
        console.log("Access Token is set");
        res.json({
            message: "Access Token is set"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUserGithub,
    setAccessToken,
    getNameCreateFolder,
    setNameFolder,
    setReactionGithub
}